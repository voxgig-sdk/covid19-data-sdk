# Covid19Data SDK feature factory

from covid19data_sdk.feature.base_feature import Covid19DataBaseFeature
from covid19data_sdk.feature.ratelimit_feature import Covid19DataRatelimitFeature
from covid19data_sdk.feature.retry_feature import Covid19DataRetryFeature
from covid19data_sdk.feature.test_feature import Covid19DataTestFeature
from covid19data_sdk.feature.timeout_feature import Covid19DataTimeoutFeature


_FEATURES = {
    "base": lambda: Covid19DataBaseFeature(),
    "ratelimit": lambda: Covid19DataRatelimitFeature(),
    "retry": lambda: Covid19DataRetryFeature(),
    "test": lambda: Covid19DataTestFeature(),
    "timeout": lambda: Covid19DataTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
