# Covid19Data TypeScript SDK Reference

Complete API reference for the Covid19Data TypeScript SDK.


## Covid19DataSDK

### Constructor

```ts
new Covid19DataSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Covid19DataSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = Covid19DataSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `Covid19DataSDK` instance in test mode.


### Instance Methods

#### `All(data?: object)`

Create a new `All` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AllEntity` instance.

#### `Historical(data?: object)`

Create a new `Historical` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HistoricalEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `Covid19DataSDK.test()`.

**Returns:** `Covid19DataSDK` instance in test mode.


---

## AllEntity

```ts
const all = client.all
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `case` | ``$OBJECT`` | No |  |
| `death` | ``$OBJECT`` | No |  |
| `recovered` | ``$OBJECT`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.all.load({ id: 'all_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AllEntity` instance with the same client and
options.

#### `client()`

Return the parent `Covid19DataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HistoricalEntity

```ts
const historical = client.historical
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$STRING`` | No |  |
| `province` | ``$ARRAY`` | No |  |
| `timeline` | ``$OBJECT`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.historical.load({ id: 'historical_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HistoricalEntity` instance with the same client and
options.

#### `client()`

Return the parent `Covid19DataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new Covid19DataSDK({
  feature: {
    test: { active: true },
  }
})
```

