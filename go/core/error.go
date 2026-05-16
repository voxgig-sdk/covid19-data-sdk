package core

type Covid19DataError struct {
	IsCovid19DataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCovid19DataError(code string, msg string, ctx *Context) *Covid19DataError {
	return &Covid19DataError{
		IsCovid19DataError: true,
		Sdk:              "Covid19Data",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Covid19DataError) Error() string {
	return e.Msg
}
