# Covid19Data SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Covid19DataFeatures
  def self.make_feature(name)
    case name
    when "base"
      Covid19DataBaseFeature.new
    when "test"
      Covid19DataTestFeature.new
    else
      Covid19DataBaseFeature.new
    end
  end
end
