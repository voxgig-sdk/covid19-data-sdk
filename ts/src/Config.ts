
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Covid19Data',
        slug: "covid19-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://disease.sh/v3/covid-19",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      all: {
      },

      historical: {
      },

    }
  }


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
              "parts": [
                "historical",
                "all"
              ],
              "select": {
                "exist": [
                  "lastday"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "historical",
                "{id}"
              ],
              "rename": {
                "param": {
                  "country": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "lastday"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

