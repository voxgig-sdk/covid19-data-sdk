
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Covid19DataSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await Covid19DataSDK.test()
    equal(null !== testsdk, true)
  })

})
