import { Covid19DataEntityBase } from '../Covid19DataEntityBase';
import type { Covid19DataSDK } from '../Covid19DataSDK';
import type { Control } from '../types';
import type { All, AllLoadMatch } from '../Covid19DataTypes';
declare class AllEntity extends Covid19DataEntityBase<All> {
    constructor(client: Covid19DataSDK, entopts: any);
    make(this: AllEntity): AllEntity;
    load(this: any, reqmatch?: AllLoadMatch, ctrl?: Control): Promise<AllEntity>;
}
export { AllEntity };
