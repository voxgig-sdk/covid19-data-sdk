"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AllEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when COVID19_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('COVID19_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Covid19DataSDK.test();
        const ent = testsdk.All();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.COVID19_DATA_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'all.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cases", "req": false, "short": "Historical cases data with dates as keys and case counts as values", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "deaths", "req": false, "short": "Historical deaths data with dates as keys and death counts as values", "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "recovered", "req": false, "short": "Historical recovered data with dates as keys and recovery counts as values", "type": "`$OBJECT`", "index$": 2 }], "name": "all", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "all", "kind": "query", "name": "lastday", "orig": "lastday", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /historical/all", "json": "{\"operationId\":\"getHistoricalAll\",\"parameters\":[{\"description\":\"Number of days to return. Use 'all' for full historical data, or specify a number (e.g., 30, 7)\",\"in\":\"query\",\"name\":\"lastdays\",\"required\":false,\"schema\":{\"default\":\"30\",\"example\":\"all\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"cases\":{\"1/22/20\":557,\"1/23/20\":657,\"1/24/20\":944,\"1/25/20\":1437},\"deaths\":{\"1/22/20\":17,\"1/23/20\":18,\"1/24/20\":26,\"1/25/20\":42},\"recovered\":{\"1/22/20\":30,\"1/23/20\":32,\"1/24/20\":36,\"1/25/20\":39}},\"schema\":{\"description\":\"Historical COVID-19 data for all countries combined\",\"properties\":{\"cases\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical cases data with dates as keys and case counts as values\",\"example\":{\"1/22/20\":557,\"1/23/20\":657},\"type\":\"object\"},\"deaths\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical deaths data with dates as keys and death counts as values\",\"example\":{\"1/22/20\":17,\"1/23/20\":18},\"type\":\"object\"},\"recovered\":{\"additionalProperties\":{\"type\":\"integer\"},\"description\":\"Historical recovered data with dates as keys and recovery counts as values\",\"example\":{\"1/22/20\":30,\"1/23/20\":32},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response with historical COVID-19 data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"example\":\"Invalid parameter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response\",\"properties\":{\"message\":{\"description\":\"Error message\",\"example\":\"Invalid parameter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/historical/all", "segments": [{ "lit": "historical" }, { "lit": "all" }], "select": { "exist": ["lastday"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "all", "name__orig": "all", "Name": "All", "name_": "all", "name-": "all", "NAME": "ALL", "index$": 0 }, { "active": true, "entity": "all", "key$": "BasicAllFlow", "kind": "basic", "name": "BasicAllFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "all_ref01", "srcdatavar": "all_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-all_ref01" } }], "index$": 0 }] }, 'All');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let all_ref01_data = Object.values(setup.data.existing.all)[0];
        // LOAD
        const all_ref01_ent = client.All();
        const all_ref01_match_dt0 = {};
        const all_ref01_data_dt0 = (await all_ref01_ent.load(all_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != all_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/all/AllTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Covid19DataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['all01', 'all02', 'all03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'COVID19_DATA_TEST_ALL_ENTID': idmap,
        'COVID19_DATA_TEST_LIVE': 'FALSE',
        'COVID19_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['COVID19_DATA_TEST_ALL_ENTID'];
    const live = 'TRUE' === env.COVID19_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['COVID19_DATA_TEST_ALL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.Covid19DataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=AllEntity.test.js.map