# Covid19Data SDK utility: prepare_body
require_relative 'media'
module Covid19DataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return Covid19DataUtilities.raw_body(ctx.reqdata) if Covid19DataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
