# Covid19Data SDK feature factory

from covid19data_sdk.feature.base_feature import Covid19DataBaseFeature
from covid19data_sdk.feature.test_feature import Covid19DataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: Covid19DataBaseFeature(),
        "test": lambda: Covid19DataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
