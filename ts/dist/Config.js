"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Covid19Data',
        slug: "covid19-data",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://disease.sh/v3/covid-19",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            all: {},
            historical: {},
        }
    };
    entity = {
        "all": {
            "fields": [
                {
                    "name": "cases",
                    "short": "Historical cases data with dates as keys and case counts as values",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "deaths",
                    "short": "Historical deaths data with dates as keys and death counts as values",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "recovered",
                    "short": "Historical recovered data with dates as keys and recovery counts as values",
                    "type": "`$OBJECT`"
                }
            ],
            "name": "all",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "all",
                                        "kind": "query",
                                        "name": "lastday",
                                        "orig": "lastday",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/historical/all",
                            "segments": [
                                {
                                    "lit": "historical"
                                },
                                {
                                    "lit": "all"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "lastday"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "historical",
                                "all"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "historical": {
            "fields": [
                {
                    "name": "country",
                    "short": "Country name",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "province",
                    "short": "List of provinces/states if applicable",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "timeline",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "historical",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "USA",
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "country",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": "all",
                                        "kind": "query",
                                        "name": "lastday",
                                        "orig": "lastday",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/historical/{country}",
                            "rename": {
                                "param": {
                                    "country": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "historical"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id",
                                    "lastday"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "historical",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map