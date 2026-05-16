<?php
declare(strict_types=1);

// Covid19Data SDK utility: feature_add

class Covid19DataFeatureAdd
{
    public static function call(Covid19DataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
