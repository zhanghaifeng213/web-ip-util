import { JsonpType } from './const'
import { ElementType } from './types'
import { jsonp } from './utils/jsonpTypeToPromise'

export function promiseFactory(element: ElementType, index = 0) {
  const { type = JsonpType, ...others } = element
  if (type === JsonpType) {
    return jsonp({ ...others, index })
  }
  // TODO 其他情况根据type判断类型进行处理
}
