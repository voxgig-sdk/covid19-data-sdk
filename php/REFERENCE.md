# Covid19Data PHP SDK Reference

Complete API reference for the Covid19Data PHP SDK.


## Covid19DataSDK

### Constructor

```php
require_once __DIR__ . '/covid19-data_sdk.php';

$client = new Covid19DataSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Covid19DataSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = Covid19DataSDK::test();
```


### Instance Methods

#### `All($data = null)`

Create a new `AllEntity` instance. Pass `null` for no initial data.

#### `Historical($data = null)`

Create a new `HistoricalEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AllEntity

```php
$all = $client->All();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `case` | ``$OBJECT`` | No |  |
| `death` | ``$OBJECT`` | No |  |
| `recovered` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->All()->load(["id" => "all_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AllEntity`

Create a new `AllEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## HistoricalEntity

```php
$historical = $client->Historical();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$STRING`` | No |  |
| `province` | ``$ARRAY`` | No |  |
| `timeline` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Historical()->load(["id" => "historical_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): HistoricalEntity`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new Covid19DataSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

