import { JsonpCallbackDefault } from '../const'
import { JsonpCallback, Data, Url, ResMapping } from '../types'

/**
 * @param {string} url           请求地址
 * @param {object} data          请求参数
 * @param {string} jsonp         请求参数key值，默认callback
 * @param {string} jsonpCallback 请求参数value值，默认callback
 */

export const jsonp = function({
  id,
  index,
  url,
  data = {},
  jsonpCallback = JsonpCallbackDefault,
  resMapping
}: {
  id?: string
  index: number
  url: Url
  data?: Data
  jsonpCallback?: JsonpCallback
  resMapping: ResMapping
}) {
  return new Promise(function(resolve, reject) {
    //定义一个处理Jsonp返回数据的回调函数 默认callback
    // @ts-ignore
    window[jsonpCallback] = (res: any) => {
      const ip = resMapping.ip.split('.').reduce((pre, cur) => {
        return pre?.[cur]
      }, res)
      let obj = { ...res, index }
      if (id) {
        obj.id = id
      }
      if (ip) {
        resolve(obj)
      }
      reject(obj)
    }
    // 创建一个script标签
    let script = document.createElement('script')
    // 将参数转为 key1=value1&key2=value2格式
    // TODO url参数和data参数重复处理
    let params = Object.entries(data)
      .map(item => item.join('='))
      .join('&')

    const urlNew = params ? url + (url.indexOf('?') === -1 ? '?' : '&') + params : url
    script.setAttribute('src', urlNew)
    script.setAttribute('referrerpolicy', 'no-referrer')
    // 临时插入head中
    document.head.appendChild(script)
    script.onload = function() {
      // 请求完删除冗余script标签
      document.head.removeChild(script)
    }
    script.onerror = () => reject('加载失败')
  })
}
