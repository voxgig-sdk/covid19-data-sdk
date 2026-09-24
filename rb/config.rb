# Covid19Data SDK configuration

module Covid19DataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Covid19Data",
        "slug" => "covid19-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://disease.sh/v3/covid-19",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "all" => {},
          "historical" => {},
        },
      },
      "entity" => {
        "all" => {
          "fields" => [
            {
              "name" => "cases",
              "title" => "Cases",
              "type" => "`$OBJECT`",
              "short" => "Historical cases data with dates as keys and case counts as values",
            },
            {
              "name" => "deaths",
              "title" => "Deaths",
              "type" => "`$OBJECT`",
              "short" => "Historical deaths data with dates as keys and death counts as values",
            },
            {
              "name" => "recovered",
              "title" => "Recovered",
              "type" => "`$OBJECT`",
              "short" => "Historical recovered data with dates as keys and recovery counts as values",
            },
          ],
          "name" => "all",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/historical/all",
                  "segments" => [
                    {
                      "lit" => "historical",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "parts" => [
                    "historical",
                    "all",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "lastday",
                        "orig" => "lastday",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "all",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "lastday",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "historical" => {
          "fields" => [
            {
              "name" => "country",
              "title" => "Country",
              "type" => "`$STRING`",
              "short" => "Country name",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "province",
              "title" => "Province",
              "type" => "`$ARRAY`",
              "short" => "List of provinces/states if applicable",
            },
            {
              "name" => "timeline",
              "title" => "Timeline",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "historical",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/historical/{country}",
                  "segments" => [
                    {
                      "lit" => "historical",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "historical",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "country" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "country",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "USA",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "lastday",
                        "orig" => "lastday",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "all",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                      "lastday",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    Covid19DataFeatures.make_feature(name)
  end
end
