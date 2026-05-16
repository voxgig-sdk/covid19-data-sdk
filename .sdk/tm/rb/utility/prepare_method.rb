# Covid19Data SDK utility: prepare_method
module Covid19DataUtilities
  METHOD_MAP = { "create"=>"POST", "update"=>"PUT", "load"=>"GET", "list"=>"GET", "remove"=>"DELETE", "patch"=>"PATCH" }
  PrepareMethod = ->(ctx) { METHOD_MAP[ctx.op.name] || "GET" }
end
