import { AllEntity } from './entity/AllEntity';
import { HistoricalEntity } from './entity/HistoricalEntity';
export type * from './Covid19DataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { Covid19DataEntityBase } from './Covid19DataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class Covid19DataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    All(entopts?: Record<string, any>): AllEntity;
    Historical(entopts?: Record<string, any>): HistoricalEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): Covid19DataSDK;
    tester(testopts?: any, sdkopts?: any): Covid19DataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof Covid19DataSDK;
export { stdutil, config, BaseFeature, Covid19DataEntityBase, Covid19DataSDK, SDK, };
