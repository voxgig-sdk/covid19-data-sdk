-- ProjectName SDK exists test

local sdk = require("covid19-data_sdk")

describe("Covid19DataSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
