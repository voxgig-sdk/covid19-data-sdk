<?php
declare(strict_types=1);

// Covid19Data SDK utility: result_body

class Covid19DataResultBody
{
    public static function call(Covid19DataContext $ctx): ?Covid19DataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
