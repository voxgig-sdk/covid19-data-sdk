

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


describe('AllEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when COVID19_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('COVID19_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Covid19DataSDK.test()
    const ent = testsdk.All()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.COVID19_DATA_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'all.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cases":{"a":true,"h":"Cases","n":"cases","r":false,"sh":"Historical cases data with dates as keys and case counts as values","t":"`$OBJECT`","key$":"cases","index$":0},"deaths":{"a":true,"h":"Deaths","n":"deaths","r":false,"sh":"Historical deaths data with dates as keys and death counts as values","t":"`$OBJECT`","key$":"deaths","index$":1},"recovered":{"a":true,"h":"Recovered","n":"recovered","r":false,"sh":"Historical recovered data with dates as keys and recovery counts as values","t":"`$OBJECT`","key$":"recovered","index$":2}},"name":"all","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /historical/all","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"all","k":"query","n":"lastday","or":"lastday","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/historical/all","q":{"exist":["lastday"]},"r":{},"s":[{"lit":"historical"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"all","name__orig":"all","Name":"All","name_":"all","name-":"all","NAME":"ALL","index$":0}, {"active":true,"entity":"all","key$":"BasicAllFlow","kind":"basic","name":"BasicAllFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"all_ref01","srcdatavar":"all_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-all_ref01"}}],"index$":0}]}, 'All', {"GET /historical/all":{"protocol":"http","operationId":"getHistoricalAll","responses":{"200":{"description":"Successful response with historical COVID-19 data","content":{"application/json":{"schema":{"type":"object","description":"Historical COVID-19 data for all countries combined","properties":{"cases":{"additionalProperties":{"type":"integer"},"description":"Historical cases data with dates as keys and case counts as values","example":{"1/22/20":557,"1/23/20":657},"key$":"cases","type":"object"},"deaths":{"additionalProperties":{"type":"integer"},"description":"Historical deaths data with dates as keys and death counts as values","example":{"1/22/20":17,"1/23/20":18},"key$":"deaths","type":"object"},"recovered":{"additionalProperties":{"type":"integer"},"description":"Historical recovered data with dates as keys and recovery counts as values","example":{"1/22/20":30,"1/23/20":32},"key$":"recovered","type":"object"}},"x-ref":"#/components/schemas/HistoricalAllResponse","index$":0},"example":{"cases":{"1/22/20":557,"1/23/20":657,"1/24/20":944,"1/25/20":1437},"deaths":{"1/22/20":17,"1/23/20":18,"1/24/20":26,"1/25/20":42},"recovered":{"1/22/20":30,"1/23/20":32,"1/24/20":36,"1/25/20":39}}}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message","example":"Invalid parameter"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","description":"Error response","properties":{"message":{"type":"string","description":"Error message","example":"Invalid parameter"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"lastdays","in":"query","description":"Number of days to return. Use 'all' for full historical data, or specify a number (e.g., 30, 7)","required":false,"schema":{"type":"string","default":"30","example":"all"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let all_ref01_data = Object.values(setup.data.existing.all)[0] as any

    // LOAD
    const all_ref01_ent = client.All()
    const all_ref01_match_dt0: any = {}
    const all_ref01_data_dt0 = (await all_ref01_ent.load(all_ref01_match_dt0)).data()
    assert(null != all_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/all/AllTestData.json')

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
    ['all01','all02','all03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'COVID19_DATA_TEST_ALL_ENTID': idmap,
    'COVID19_DATA_TEST_LIVE': 'FALSE',
    'COVID19_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['COVID19_DATA_TEST_ALL_ENTID']

  const live = 'TRUE' === env.COVID19_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['COVID19_DATA_TEST_ALL_ENTID']
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
  
