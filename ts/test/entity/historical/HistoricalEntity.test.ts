

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Covid19DataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('HistoricalEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COVID19_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('COVID19_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Covid19DataSDK.test()
    const ent = testsdk.Historical()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COVID19_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'historical.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"country","req":false,"short":"Country name","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"province","req":false,"short":"List of provinces/states if applicable","type":"`$ARRAY`","index$":2},{"active":true,"name":"timeline","req":false,"type":"`$OBJECT`","index$":3}],"id":{"field":"id","name":"id"},"name":"historical","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"USA","kind":"param","name":"id","orig":"country","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"all","kind":"query","name":"lastday","orig":"lastday","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /historical/{country}","json":"{\"operationId\":\"getHistoricalCountry\",\"parameters\":[{\"description\":\"Country name or ISO code\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"example\":\"USA\",\"type\":\"string\"}},{\"description\":\"Number of days to return. Use 'all' for full historical data, or specify a number (e.g., 30, 7)\",\"in\":\"query\",\"name\":\"lastdays\",\"required\":false,\"schema\":{\"default\":\"30\",\"example\":\"all\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Historical COVID-19 data for a specific country\",\"properties\":{\"country\":{\"description\":\"Country name\",\"example\":\"USA\",\"type\":\"string\"},\"province\":{\"description\":\"List of provinces/states if applicable\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"timeline\":{\"properties\":{\"cases\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical cases data\",\"type\":\"object\"},\"deaths\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical deaths data\",\"type\":\"object\"},\"recovered\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical recovered data\",\"type\":\"object\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with country historical data\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"example\":\"Invalid parameter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Country not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/historical/{country}","rename":{"param":{"country":"id"}},"segments":[{"lit":"historical"},{"var":"id"}],"select":{"exist":["id","lastday"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"historical","name__orig":"historical","Name":"Historical","name_":"historical","name-":"historical","NAME":"HISTORICAL","index$":1}, {"active":true,"entity":"historical","key$":"BasicHistoricalFlow","kind":"basic","name":"BasicHistoricalFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"historical_ref01","srcdatavar":"historical_ref01_data","suffix":"_dt0"},"match":{"id":"historical01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-historical_ref01"}}],"index$":0}]}, 'Historical')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let historical_ref01_data = Object.values(setup.data.existing.historical)[0] as any

    // LOAD
    const historical_ref01_ent = client.Historical()
    const historical_ref01_match_dt0: any = {}
    historical_ref01_match_dt0.id = historical_ref01_data.id
    const historical_ref01_data_dt0 = (await historical_ref01_ent.load(historical_ref01_match_dt0)).data()
    assert(historical_ref01_data_dt0.id === historical_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/historical/HistoricalTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Covid19DataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['historical01','historical02','historical03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COVID19_DATA_TEST_HISTORICAL_ENTID': idmap,
    'COVID19_DATA_TEST_LIVE': 'FALSE',
    'COVID19_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COVID19_DATA_TEST_HISTORICAL_ENTID']

  const live = 'TRUE' === env.COVID19_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COVID19_DATA_TEST_HISTORICAL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Covid19DataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.COVID19_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
