import { Covid19DataEntityBase } from '../Covid19DataEntityBase';
import type { Covid19DataSDK } from '../Covid19DataSDK';
import type { Control } from '../types';
import type { Historical, HistoricalLoadMatch } from '../Covid19DataTypes';
declare class HistoricalEntity extends Covid19DataEntityBase<Historical> {
    constructor(client: Covid19DataSDK, entopts: any);
    make(this: HistoricalEntity): HistoricalEntity;
    load(this: any, reqmatch?: HistoricalLoadMatch, ctrl?: Control): Promise<HistoricalEntity>;
}
export { HistoricalEntity };
