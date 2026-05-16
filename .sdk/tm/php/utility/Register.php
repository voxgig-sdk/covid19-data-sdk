<?php
declare(strict_types=1);

// Covid19Data SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

Covid19DataUtility::setRegistrar(function (Covid19DataUtility $u): void {
    $u->clean = [Covid19DataClean::class, 'call'];
    $u->done = [Covid19DataDone::class, 'call'];
    $u->make_error = [Covid19DataMakeError::class, 'call'];
    $u->feature_add = [Covid19DataFeatureAdd::class, 'call'];
    $u->feature_hook = [Covid19DataFeatureHook::class, 'call'];
    $u->feature_init = [Covid19DataFeatureInit::class, 'call'];
    $u->fetcher = [Covid19DataFetcher::class, 'call'];
    $u->make_fetch_def = [Covid19DataMakeFetchDef::class, 'call'];
    $u->make_context = [Covid19DataMakeContext::class, 'call'];
    $u->make_options = [Covid19DataMakeOptions::class, 'call'];
    $u->make_request = [Covid19DataMakeRequest::class, 'call'];
    $u->make_response = [Covid19DataMakeResponse::class, 'call'];
    $u->make_result = [Covid19DataMakeResult::class, 'call'];
    $u->make_point = [Covid19DataMakePoint::class, 'call'];
    $u->make_spec = [Covid19DataMakeSpec::class, 'call'];
    $u->make_url = [Covid19DataMakeUrl::class, 'call'];
    $u->param = [Covid19DataParam::class, 'call'];
    $u->prepare_auth = [Covid19DataPrepareAuth::class, 'call'];
    $u->prepare_body = [Covid19DataPrepareBody::class, 'call'];
    $u->prepare_headers = [Covid19DataPrepareHeaders::class, 'call'];
    $u->prepare_method = [Covid19DataPrepareMethod::class, 'call'];
    $u->prepare_params = [Covid19DataPrepareParams::class, 'call'];
    $u->prepare_path = [Covid19DataPreparePath::class, 'call'];
    $u->prepare_query = [Covid19DataPrepareQuery::class, 'call'];
    $u->result_basic = [Covid19DataResultBasic::class, 'call'];
    $u->result_body = [Covid19DataResultBody::class, 'call'];
    $u->result_headers = [Covid19DataResultHeaders::class, 'call'];
    $u->transform_request = [Covid19DataTransformRequest::class, 'call'];
    $u->transform_response = [Covid19DataTransformResponse::class, 'call'];
});
