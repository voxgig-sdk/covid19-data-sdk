import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "all",
    "accessor": "All",
    "op": "load",
    "method": "GET",
    "path": "/historical/all",
    "args": [],
    "select": {
      "lastday": "v1"
    },
    "headers": [],
    "query": [
      "lastdays"
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
      "lastday": "v1"
    },
    "headers": [],
    "query": [
      "lastdays"
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
