-- Covid19Data SDK error

local Covid19DataError = {}
Covid19DataError.__index = Covid19DataError


function Covid19DataError.new(code, msg, ctx)
  local self = setmetatable({}, Covid19DataError)
  self.is_sdk_error = true
  self.sdk = "Covid19Data"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Covid19DataError:error()
  return self.msg
end


function Covid19DataError:__tostring()
  return self.msg
end


return Covid19DataError
