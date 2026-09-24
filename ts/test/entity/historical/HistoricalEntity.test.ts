

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Country name","t":"`$STRING`","key$":"country","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"province":{"a":true,"h":"Province","n":"province","r":false,"sh":"List of provinces/states if applicable","t":"`$ARRAY`","key$":"province","index$":2},"timeline":{"a":true,"h":"Timeline","n":"timeline","r":false,"t":"`$OBJECT`","key$":"timeline","index$":3}},"id":{"field":"id","name":"id"},"name":"historical","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /historical/{country}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"USA","k":"param","n":"id","or":"country","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"all","k":"query","n":"lastday","or":"lastday","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/historical/{country}","q":{"exist":["id","lastday"]},"r":{"param":{"country":"id"}},"s":[{"lit":"historical"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"historical","name__orig":"historical","Name":"Historical","name_":"historical","name-":"historical","NAME":"HISTORICAL","index$":1}, {"active":true,"entity":"historical","key$":"BasicHistoricalFlow","kind":"basic","name":"BasicHistoricalFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"historical_ref01","srcdatavar":"historical_ref01_data","suffix":"_dt0"},"m":{"id":"historical01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-historical_ref01"}}],"index$":0}]}, 'Historical', {"GET /historical/{country}":{"protocol":"http","operationId":"getHistoricalCountry","responses":{"200":{"description":"Successful response with country historical data","content":{"application/json":{"schema":{"type":"object","description":"Historical COVID-19 data for a specific country","properties":{"country":{"type":"string","description":"Country name","example":"USA","key$":"country"},"province":{"type":"array","description":"List of provinces/states if applicable","items":{"type":"string"},"key$":"province"},"timeline":{"type":"object","properties":{"cases":{"type":"object","description":"Historical cases data","additionalProperties":{"type":"integer"}},"deaths":{"type":"object","description":"Historical deaths data","additionalProperties":{"type":"integer"}},"recovered":{"type":"object","description":"Historical recovered data","additionalProperties":{"type":"integer"}}},"key$":"timeline"}},"x-ref":"#/components/schemas/HistoricalCountryResponse","index$":0}}}},"404":{"description":"Country not found","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message","example":"Invalid parameter"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"country","in":"path","description":"Country name or ISO code","required":true,"schema":{"type":"string","example":"USA"},"index$":0},{"name":"lastdays","in":"query","description":"Number of days to return. Use 'all' for full historical data, or specify a number (e.g., 30, 7)","required":false,"schema":{"type":"string","default":"30","example":"all"},"index$":1}],"securitySource":"unspecified"}})
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
  
