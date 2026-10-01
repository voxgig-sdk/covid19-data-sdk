-- Covid19Data SDK error

local json = require("dkjson")

local Covid19DataError = {}
Covid19DataError.__index = Covid19DataError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function Covid19DataError.new(code, msg, ctx)
  local self = setmetatable({}, Covid19DataError)
  self.is_sdk_error = true
  self.sdk = "Covid19Data"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function Covid19DataError:context()
  return CONTEXT[self]
end


function Covid19DataError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function Covid19DataError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function Covid19DataError:to_json()
  return json.encode(self:to_table())
end


function Covid19DataError:__tostring()
  return self.msg
end


function Covid19DataError.__tojson(self)
  return self:to_json()
end


return Covid19DataError
