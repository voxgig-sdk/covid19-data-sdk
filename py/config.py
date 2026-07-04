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
            "active": True,
            "name": "case",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "death",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "recovered",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
        ],
        "name": "all",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "all",
                      "kind": "query",
                      "name": "lastday",
                      "orig": "lastday",
                      "reqd": False,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
            ],
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
            "active": True,
            "name": "country",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "province",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "timeline",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
        ],
        "name": "historical",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "USA",
                      "kind": "param",
                      "name": "id",
                      "orig": "country",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "example": "all",
                      "kind": "query",
                      "name": "lastday",
                      "orig": "lastday",
                      "reqd": False,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
