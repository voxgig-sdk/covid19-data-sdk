package voxgigcovid19datasdk

import (
	"github.com/voxgig-sdk/covid19-data-sdk/core"
	"github.com/voxgig-sdk/covid19-data-sdk/entity"
	"github.com/voxgig-sdk/covid19-data-sdk/feature"
	_ "github.com/voxgig-sdk/covid19-data-sdk/utility"
)

// Type aliases preserve external API.
type Covid19DataSDK = core.Covid19DataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Covid19DataEntity = core.Covid19DataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Covid19DataError = core.Covid19DataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAllEntityFunc = func(client *core.Covid19DataSDK, entopts map[string]any) core.Covid19DataEntity {
		return entity.NewAllEntity(client, entopts)
	}
	core.NewHistoricalEntityFunc = func(client *core.Covid19DataSDK, entopts map[string]any) core.Covid19DataEntity {
		return entity.NewHistoricalEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCovid19DataSDK = core.NewCovid19DataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
