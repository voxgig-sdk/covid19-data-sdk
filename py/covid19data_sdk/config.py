# Covid19Data SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "cases",
            "type": "`$OBJECT`",
          },
          {
            "name": "deaths",
            "type": "`$OBJECT`",
          },
          {
            "name": "recovered",
            "type": "`$OBJECT`",
          },
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
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "type": "`$STRING`",
          },
          {
            "name": "province",
            "type": "`$ARRAY`",
          },
          {
            "name": "timeline",
            "type": "`$OBJECT`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "all",
                      "kind": "query",
                      "name": "lastday",
                      "orig": "lastday",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
