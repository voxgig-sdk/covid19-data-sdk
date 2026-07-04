package core

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
						"active": true,
						"name": "case",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "death",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "recovered",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
				},
				"name": "all",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "all",
											"kind": "query",
											"name": "lastday",
											"orig": "lastday",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"historical": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "country",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "province",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "timeline",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
				},
				"name": "historical",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "USA",
											"kind": "param",
											"name": "id",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
											"index$": 0,
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"example": "all",
											"kind": "query",
											"name": "lastday",
											"orig": "lastday",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
