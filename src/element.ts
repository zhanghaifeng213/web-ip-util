import { JsonpCallbackDefault, JsonpType } from './const'
import { JsonpCallback, Data, Type, Url } from './types'

export default class WebIpUtil {
  type: Type
  url: Url
  data: Data
  jsonpCallback: JsonpCallback
  constructor({
    type,
    url,
    data,
    jsonpCallback
  }: {
    type?: Type
    url: Url
    data?: Data
    jsonpCallback?: JsonpCallback
  }) {
    this.type = type || JsonpType
    this.url = url
    this.data = data || {}
    this.jsonpCallback = jsonpCallback || JsonpCallbackDefault
  }
}
