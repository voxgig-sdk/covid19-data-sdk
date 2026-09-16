

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cases","req":false,"short":"Historical cases data with dates as keys and case counts as values","type":"`$OBJECT`","index$":0},{"active":true,"name":"deaths","req":false,"short":"Historical deaths data with dates as keys and death counts as values","type":"`$OBJECT`","index$":1},{"active":true,"name":"recovered","req":false,"short":"Historical recovered data with dates as keys and recovery counts as values","type":"`$OBJECT`","index$":2}],"name":"all","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"all","kind":"query","name":"lastday","orig":"lastday","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /historical/all","json":"{\"operationId\":\"getHistoricalAll\",\"parameters\":[{\"description\":\"Number of days to return. Use 'all' for full historical data, or specify a number (e.g., 30, 7)\",\"in\":\"query\",\"name\":\"lastdays\",\"required\":false,\"schema\":{\"default\":\"30\",\"example\":\"all\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"cases\":{\"1/22/20\":557,\"1/23/20\":657,\"1/24/20\":944,\"1/25/20\":1437},\"deaths\":{\"1/22/20\":17,\"1/23/20\":18,\"1/24/20\":26,\"1/25/20\":42},\"recovered\":{\"1/22/20\":30,\"1/23/20\":32,\"1/24/20\":36,\"1/25/20\":39}},\"schema\":{\"description\":\"Historical COVID-19 data for all countries combined\",\"properties\":{\"cases\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical cases data with dates as keys and case counts as values\",\"example\":{\"1/22/20\":557,\"1/23/20\":657},\"type\":\"object\"},\"deaths\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical deaths data with dates as keys and death counts as values\",\"example\":{\"1/22/20\":17,\"1/23/20\":18},\"type\":\"object\"},\"recovered\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical recovered data with dates as keys and recovery counts as values\",\"example\":{\"1/22/20\":30,\"1/23/20\":32},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with historical COVID-19 data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"example\":\"Invalid parameter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"example\":\"Invalid parameter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/historical/all","segments":[{"lit":"historical"},{"lit":"all"}],"select":{"exist":["lastday"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"all","name__orig":"all","Name":"All","name_":"all","name-":"all","NAME":"ALL","index$":0}, {"active":true,"entity":"all","key$":"BasicAllFlow","kind":"basic","name":"BasicAllFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"all_ref01","srcdatavar":"all_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-all_ref01"}}],"index$":0}]}, 'All')
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
  
