package = "voxgig-sdk-covid19-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/covid19-data-sdk.git"
}
description = {
  summary = "Covid19Data SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["covid19-data_sdk"] = "covid19-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
