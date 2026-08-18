package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Covid19Data",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://disease.sh/v3/covid-19",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"all": map[string]any{},
				"historical": map[string]any{},
			},
		},
		"entity": map[string]any{
			"all": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cases",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "deaths",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "recovered",
						"type": "`$OBJECT`",
					},
				},
				"name": "all",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "all",
											"kind": "query",
											"name": "lastday",
											"orig": "lastday",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/historical/all",
								"parts": []any{
									"historical",
									"all",
								},
								"select": map[string]any{
									"exist": []any{
										"lastday",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"historical": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "province",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "timeline",
						"type": "`$OBJECT`",
					},
				},
				"name": "historical",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "USA",
											"kind": "param",
											"name": "id",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "all",
											"kind": "query",
											"name": "lastday",
											"orig": "lastday",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/historical/{country}",
								"parts": []any{
									"historical",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"country": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"lastday",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
