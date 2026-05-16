# Covid19Data SDK utility: feature_add
module Covid19DataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
