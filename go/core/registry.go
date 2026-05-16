package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAllEntityFunc func(client *Covid19DataSDK, entopts map[string]any) Covid19DataEntity

var NewHistoricalEntityFunc func(client *Covid19DataSDK, entopts map[string]any) Covid19DataEntity

