<?php
declare(strict_types=1);

// Covid19Data SDK base feature

class Covid19DataBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Covid19DataContext $ctx, array $options): void {}
    public function PostConstruct(Covid19DataContext $ctx): void {}
    public function PostConstructEntity(Covid19DataContext $ctx): void {}
    public function SetData(Covid19DataContext $ctx): void {}
    public function GetData(Covid19DataContext $ctx): void {}
    public function GetMatch(Covid19DataContext $ctx): void {}
    public function SetMatch(Covid19DataContext $ctx): void {}
    public function PrePoint(Covid19DataContext $ctx): void {}
    public function PreSpec(Covid19DataContext $ctx): void {}
    public function PreRequest(Covid19DataContext $ctx): void {}
    public function PreResponse(Covid19DataContext $ctx): void {}
    public function PreResult(Covid19DataContext $ctx): void {}
    public function PreDone(Covid19DataContext $ctx): void {}
    public function PreUnexpected(Covid19DataContext $ctx): void {}
}
