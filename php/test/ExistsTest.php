<?php
declare(strict_types=1);

// Covid19Data SDK exists test

require_once __DIR__ . '/../covid19data_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Covid19DataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
