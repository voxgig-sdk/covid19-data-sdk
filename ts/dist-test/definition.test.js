"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "all",
        "accessor": "All",
        "op": "load",
        "method": "GET",
        "path": "/historical/all",
        "args": [],
        "select": {
            "lastday": "all"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lastdays"
        ],
        "queryArgs": [
            {
                "name": "lastday",
                "wire": "lastdays"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "cases": {
                "1/22/20": 557,
                "1/23/20": 657,
                "1/24/20": 944,
                "1/25/20": 1437
            },
            "deaths": {
                "1/22/20": 17,
                "1/23/20": 18,
                "1/24/20": 26,
                "1/25/20": 42
            },
            "recovered": {
                "1/22/20": 30,
                "1/23/20": 32,
                "1/24/20": 36,
                "1/25/20": 39
            }
        },
        "idField": "id"
    },
    {
        "entity": "historical",
        "accessor": "Historical",
        "op": "load",
        "method": "GET",
        "path": "/historical/{country}",
        "args": [
            {
                "name": "id",
                "wire": "country",
                "value": "USA"
            }
        ],
        "select": {
            "lastday": "all"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "lastdays"
        ],
        "queryArgs": [
            {
                "name": "lastday",
                "wire": "lastdays"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "country": "USA",
            "province": [
                "x"
            ],
            "timeline": {
                "cases": {},
                "deaths": {},
                "recovered": {}
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map