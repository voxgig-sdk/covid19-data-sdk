# Covid19Data SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "covid19-data",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Historical cases data with dates as keys and case counts as values",
            "type": "`$OBJECT`",
          },
          {
            "name": "deaths",
            "short": "Historical deaths data with dates as keys and death counts as values",
            "type": "`$OBJECT`",
          },
          {
            "name": "recovered",
            "short": "Historical recovered data with dates as keys and recovery counts as values",
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
                "segments": [
                  {
                    "lit": "historical",
                  },
                  {
                    "lit": "all",
                  },
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
                "parts": [
                  "historical",
                  "all",
                ],
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
            "short": "Country name",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "province",
            "short": "List of provinces/states if applicable",
            "type": "`$ARRAY`",
          },
          {
            "name": "timeline",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                "rename": {
                  "param": {
                    "country": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "historical",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "parts": [
                  "historical",
                  "{id}",
                ],
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
