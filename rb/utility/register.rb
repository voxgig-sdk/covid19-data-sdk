# Covid19Data SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

Covid19DataUtility.registrar = ->(u) {
  u.clean = Covid19DataUtilities::Clean
  u.done = Covid19DataUtilities::Done
  u.make_error = Covid19DataUtilities::MakeError
  u.feature_add = Covid19DataUtilities::FeatureAdd
  u.feature_hook = Covid19DataUtilities::FeatureHook
  u.feature_init = Covid19DataUtilities::FeatureInit
  u.fetcher = Covid19DataUtilities::Fetcher
  u.make_fetch_def = Covid19DataUtilities::MakeFetchDef
  u.make_context = Covid19DataUtilities::MakeContext
  u.make_options = Covid19DataUtilities::MakeOptions
  u.make_request = Covid19DataUtilities::MakeRequest
  u.make_response = Covid19DataUtilities::MakeResponse
  u.make_result = Covid19DataUtilities::MakeResult
  u.make_point = Covid19DataUtilities::MakePoint
  u.make_spec = Covid19DataUtilities::MakeSpec
  u.make_url = Covid19DataUtilities::MakeUrl
  u.param = Covid19DataUtilities::Param
  u.prepare_auth = Covid19DataUtilities::PrepareAuth
  u.prepare_body = Covid19DataUtilities::PrepareBody
  u.prepare_headers = Covid19DataUtilities::PrepareHeaders
  u.prepare_method = Covid19DataUtilities::PrepareMethod
  u.prepare_params = Covid19DataUtilities::PrepareParams
  u.prepare_path = Covid19DataUtilities::PreparePath
  u.prepare_query = Covid19DataUtilities::PrepareQuery
  u.result_basic = Covid19DataUtilities::ResultBasic
  u.result_body = Covid19DataUtilities::ResultBody
  u.result_headers = Covid19DataUtilities::ResultHeaders
  u.transform_request = Covid19DataUtilities::TransformRequest
  u.transform_response = Covid19DataUtilities::TransformResponse
}
