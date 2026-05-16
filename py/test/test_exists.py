# ProjectName SDK exists test

import pytest
from covid19data_sdk import Covid19DataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Covid19DataSDK.test(None, None)
        assert testsdk is not None
