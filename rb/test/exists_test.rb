# Covid19Data SDK exists test

require "minitest/autorun"
require_relative "../Covid19Data_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Covid19DataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
