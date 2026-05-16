
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://disease.sh/v3/covid-19',

    auth: {
      prefix: 'Bearer',
    },

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
          "name": "cas",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 0
        },
        {
          "name": "death",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 1
        },
        {
          "name": "recovered",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "all",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "province",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "timeline",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "historical",
      "op": {
        "load": {
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
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "example": "all",
                    "kind": "query",
                    "name": "lastday",
                    "orig": "lastday",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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

