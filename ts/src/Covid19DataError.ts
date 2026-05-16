
import { Context } from './Context'


class Covid19DataError extends Error {

  isCovid19DataError = true

  sdk = 'Covid19Data'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Covid19DataError
}

