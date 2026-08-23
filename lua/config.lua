-- Covid19Data SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Covid19Data",
      slug = "covid19-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://disease.sh/v3/covid-19",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["all"] = {},
        ["historical"] = {},
      },
    },
    entity = {
      ["all"] = {
        ["fields"] = {
          {
            ["name"] = "cases",
            ["short"] = "Historical cases data with dates as keys and case counts as values",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "deaths",
            ["short"] = "Historical deaths data with dates as keys and death counts as values",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "recovered",
            ["short"] = "Historical recovered data with dates as keys and recovery counts as values",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "all",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "all",
                      ["kind"] = "query",
                      ["name"] = "lastday",
                      ["orig"] = "lastday",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/historical/all",
                ["parts"] = {
                  "historical",
                  "all",
                },
                ["select"] = {
                  ["exist"] = {
                    "lastday",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["historical"] = {
        ["fields"] = {
          {
            ["name"] = "country",
            ["short"] = "Country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "province",
            ["short"] = "List of provinces/states if applicable",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "timeline",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "historical",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "USA",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "all",
                      ["kind"] = "query",
                      ["name"] = "lastday",
                      ["orig"] = "lastday",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/historical/{country}",
                ["parts"] = {
                  "historical",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["country"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "lastday",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
