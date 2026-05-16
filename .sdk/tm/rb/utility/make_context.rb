# Covid19Data SDK utility: make_context
require_relative '../core/context'
module Covid19DataUtilities
  MakeContext = ->(ctxmap, basectx) {
    Covid19DataContext.new(ctxmap, basectx)
  }
end
