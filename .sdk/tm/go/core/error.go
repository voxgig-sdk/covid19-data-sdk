package core

import "encoding/json"

type Covid19DataError struct {
	IsCovid19DataError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
}

func NewCovid19DataError(code string, msg string, ctx *Context) *Covid19DataError {
	return &Covid19DataError{
		IsCovid19DataError: true,
		Sdk:                "Covid19Data",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
	}
}

func (e *Covid19DataError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *Covid19DataError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *Covid19DataError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
