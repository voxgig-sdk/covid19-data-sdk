// Typed models for the Covid19Data SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// All is the typed data model for the all entity.
type All struct {
	Case *map[string]any `json:"case,omitempty"`
	Death *map[string]any `json:"death,omitempty"`
	Recovered *map[string]any `json:"recovered,omitempty"`
}

// AllLoadMatch is the typed request payload for All.LoadTyped.
type AllLoadMatch struct {
	Case *map[string]any `json:"case,omitempty"`
	Death *map[string]any `json:"death,omitempty"`
	Recovered *map[string]any `json:"recovered,omitempty"`
}

// Historical is the typed data model for the historical entity.
type Historical struct {
	Country *string `json:"country,omitempty"`
	Province *[]any `json:"province,omitempty"`
	Timeline *map[string]any `json:"timeline,omitempty"`
}

// HistoricalLoadMatch is the typed request payload for Historical.LoadTyped.
type HistoricalLoadMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
