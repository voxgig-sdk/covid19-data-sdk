<?php
declare(strict_types=1);

// Covid19Data SDK utility: prepare_body

class Covid19DataPrepareBody
{
    public static function call(Covid19DataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
