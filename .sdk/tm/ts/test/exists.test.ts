
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { Covid19DataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = Covid19DataSDK.test()
    equal(testsdk instanceof Covid19DataSDK, true,
      'Covid19DataSDK.test() must return a client synchronously')
  })

})
