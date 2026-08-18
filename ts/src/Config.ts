
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


  main = {
    name: 'Covid19Data',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$OBJECT`"
        },
        {
          "name": "deaths",
          "type": "`$OBJECT`"
        },
        {
          "name": "recovered",
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
          "type": "`$STRING`"
        },
        {
          "name": "province",
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

