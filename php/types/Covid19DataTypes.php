<?php
declare(strict_types=1);

// Typed models for the Covid19Data SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** All entity data model. */
class All
{
    public ?array $case = null;
    public ?array $death = null;
    public ?array $recovered = null;
}

/** Request payload for All#load. */
class AllLoadMatch
{
    public ?array $case = null;
    public ?array $death = null;
    public ?array $recovered = null;
}

/** Historical entity data model. */
class Historical
{
    public ?string $country = null;
    public ?array $province = null;
    public ?array $timeline = null;
}

/** Request payload for Historical#load. */
class HistoricalLoadMatch
{
    public string $id;
}

