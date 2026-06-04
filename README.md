# Covid19Data SDK

Query aggregated COVID-19 case, death, and recovery figures with current totals and historical time series

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About COVID-19 Data API

The COVID-19 Data API is part of [disease.sh](https://disease.sh), an open "Open Disease Data API" that aggregates pandemic statistics from multiple public sources and serves them as JSON. It has been one of the most widely used community endpoints for COVID-19 dashboards and bots.

What you get from the API:

- Worldwide aggregate totals (cases, deaths, recoveries, active, tests) via the `all` endpoint.
- Historical time-series of cumulative case, death and recovery counts by date via the `historical` endpoint.
- JSON responses with no authentication required.

The pandemic-emergency phase has long since ended, so this SDK is most useful for retrospective analysis, dashboards, and teaching examples. Some upstream feeds (notably Johns Hopkins CSSE) stopped publishing daily updates in 2023, so figures for recent dates may be stale or frozen; treat the data as historical unless an endpoint is verified to still be updating.

No API key is required and responses are CORS-friendly, which is why disease.sh is commonly used directly from browser apps.

## Try it

**TypeScript**
```bash
npm install covid19-data
```

**Python**
```bash
pip install covid19-data-sdk
```

**PHP**
```bash
composer require voxgig/covid19-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/covid19-data-sdk/go
```

**Ruby**
```bash
gem install covid19-data-sdk
```

**Lua**
```bash
luarocks install covid19-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { Covid19DataSDK } from 'covid19-data'

const client = new Covid19DataSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o covid19-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "covid19-data": {
      "command": "/abs/path/to/covid19-data-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **All** | Global aggregate snapshot of COVID-19 totals (cases, deaths, recovered, active, tests and derived per-million figures) at the `/v3/covid-19/all` path. | `/historical/all` |
| **Historical** | Historical time-series of cumulative case, death and recovery counts by date, available globally and per country/province via the `/v3/covid-19/historical` path family. | `/historical/{country}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from covid19data_sdk import Covid19DataSDK

client = Covid19DataSDK({})


# Load a specific all
all, err = client.All(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'covid19data_sdk.php';

$client = new Covid19DataSDK([]);


// Load a specific all
[$all, $err] = $client->All(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/covid19-data-sdk/go"

client := sdk.NewCovid19DataSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Covid19Data_sdk"

client = Covid19DataSDK.new({})


# Load a specific all
all, err = client.All(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("covid19-data_sdk")

local client = sdk.new({})


-- Load a specific all
local all, err = client:All(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = Covid19DataSDK.test()
const result = await client.All().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = Covid19DataSDK.test(None, None)
result, err = client.All(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = Covid19DataSDK::test(null, null);
[$result, $err] = $client->All(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.All(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = Covid19DataSDK.test(nil, nil)
result, err = client.All(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:All(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the COVID-19 Data API

- Upstream: [https://disease.sh](https://disease.sh)
- API docs: [https://disease.sh/docs](https://disease.sh/docs)

- Free to use; disease.sh aggregates and republishes data from multiple upstream providers (e.g. Johns Hopkins CSSE, Worldometers, NYT and others depending on endpoint).
- Attribution to disease.sh and the underlying data sources is expected when republishing.
- Treat figures as best-effort reporting; upstream sources have varied over time and accuracy can vary by country and date.
- Terms of service and the full source list are maintained in the disease.sh GitHub project.

---

Generated from the COVID-19 Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
