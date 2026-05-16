# Covid19Data SDK utility: prepare_body
module Covid19DataUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
