# Covid19Data SDK configuration


def make_config():
    return {
        "main": {
            "name": "Covid19Data",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://disease.sh/v3/covid-19",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "all": {},
                "historical": {},
            },
        },
        "entity": {
      "all": {
        "fields": [
          {
            "name": "cas",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "death",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "recovered",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
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
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/historical/all",
                "parts": [
                  "historical",
                  "all",
                ],
                "select": {
                  "exist": [
                    "lastday",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "historical": {
        "fields": [
          {
            "name": "country",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "province",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "timeline",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "example": "all",
                      "kind": "query",
                      "name": "lastday",
                      "orig": "lastday",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/historical/{country}",
                "parts": [
                  "historical",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "country": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "lastday",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
