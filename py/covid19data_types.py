# Typed models for the Covid19Data SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class All:
    case: Optional[dict] = None
    death: Optional[dict] = None
    recovered: Optional[dict] = None


@dataclass
class AllLoadMatch:
    case: Optional[dict] = None
    death: Optional[dict] = None
    recovered: Optional[dict] = None


@dataclass
class Historical:
    country: Optional[str] = None
    province: Optional[list] = None
    timeline: Optional[dict] = None


@dataclass
class HistoricalLoadMatch:
    id: str

