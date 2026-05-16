<?php
declare(strict_types=1);

// Covid19Data SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Covid19DataMakeContext
{
    public static function call(array $ctxmap, ?Covid19DataContext $basectx): Covid19DataContext
    {
        return new Covid19DataContext($ctxmap, $basectx);
    }
}
