<?php
declare(strict_types=1);

// Covid19Data SDK utility: result_headers

class Covid19DataResultHeaders
{
    public static function call(Covid19DataContext $ctx): ?Covid19DataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
