# frozen_string_literal: true

# Typed models for the Covid19Data SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# All entity data model.
#
# @!attribute [rw] case
#   @return [Hash, nil]
#
# @!attribute [rw] death
#   @return [Hash, nil]
#
# @!attribute [rw] recovered
#   @return [Hash, nil]
All = Struct.new(
  :case,
  :death,
  :recovered,
  keyword_init: true
)

# Match filter for All#load (any subset of All fields).
#
# @!attribute [rw] case
#   @return [Hash, nil]
#
# @!attribute [rw] death
#   @return [Hash, nil]
#
# @!attribute [rw] recovered
#   @return [Hash, nil]
AllLoadMatch = Struct.new(
  :case,
  :death,
  :recovered,
  keyword_init: true
)

# Historical entity data model.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] province
#   @return [Array, nil]
#
# @!attribute [rw] timeline
#   @return [Hash, nil]
Historical = Struct.new(
  :country,
  :province,
  :timeline,
  keyword_init: true
)

# Request payload for Historical#load.
#
# @!attribute [rw] id
#   @return [String]
HistoricalLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

