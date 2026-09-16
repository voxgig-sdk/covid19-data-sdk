# Covid19Data SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Covid19DataFeatures
  def self.make_feature(name)
    case name
    when "base"
      Covid19DataBaseFeature.new
    when "ratelimit"
      Covid19DataRatelimitFeature.new
    when "retry"
      Covid19DataRetryFeature.new
    when "test"
      Covid19DataTestFeature.new
    when "timeout"
      Covid19DataTimeoutFeature.new
    else
      Covid19DataBaseFeature.new
    end
  end
end
