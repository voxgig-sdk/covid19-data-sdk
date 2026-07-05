-- Typed models for the Covid19Data SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class All
---@field case? table
---@field death? table
---@field recovered? table

---@class AllLoadMatch
---@field case? table
---@field death? table
---@field recovered? table

---@class Historical
---@field country? string
---@field province? table
---@field timeline? table

---@class HistoricalLoadMatch
---@field id string

local M = {}

return M
