<?php
declare(strict_types=1);

// Covid19Data SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Covid19DataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Covid19DataBaseFeature();
            case "test":
                return new Covid19DataTestFeature();
            default:
                return new Covid19DataBaseFeature();
        }
    }
}
