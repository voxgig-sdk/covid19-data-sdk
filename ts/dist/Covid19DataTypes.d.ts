export interface All {
    cases?: Record<string, any>;
    deaths?: Record<string, any>;
    recovered?: Record<string, any>;
}
export interface AllLoadMatch {
    lastday?: string;
}
export interface Historical {
    country?: string;
    id?: string;
    province?: any[];
    timeline?: Record<string, any>;
}
export interface HistoricalLoadMatch {
    id: string;
    lastday?: string;
}
