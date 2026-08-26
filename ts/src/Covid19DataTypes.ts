// Typed models for the Covid19Data SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface All {
  cases?: Record<string, any>
  deaths?: Record<string, any>
  recovered?: Record<string, any>
}

export interface AllLoadMatch {
  cases?: Record<string, any>
  deaths?: Record<string, any>
  recovered?: Record<string, any>
}

export interface Historical {
  country?: string
  id?: string
  province?: any[]
  timeline?: Record<string, any>
}

export interface HistoricalLoadMatch {
  id: string
}

