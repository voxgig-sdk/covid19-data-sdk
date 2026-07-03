-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "Covid19Data",
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
      auth = {
        prefix = "Bearer",
      },
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
            ["active"] = true,
            ["name"] = "case",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "death",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "recovered",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 2,
          },
        },
        ["name"] = "all",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = "all",
                      ["kind"] = "query",
                      ["name"] = "lastday",
                      ["orig"] = "lastday",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["historical"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "country",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "province",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "timeline",
            ["req"] = false,
            ["type"] = "`$OBJECT`",
            ["index$"] = 2,
          },
        },
        ["name"] = "historical",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
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
                      ["active"] = true,
                      ["example"] = "all",
                      ["kind"] = "query",
                      ["name"] = "lastday",
                      ["orig"] = "lastday",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
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
