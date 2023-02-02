/**
 * @param {string} type          请求类型
 * @param {string} url           请求地址
 * @param {object} data          请求参数
 * @param {string} jsonp         请求参数key值，默认callback
 * @param {string} jsonpCallback 请求参数value值，默认callback
 * @param {object} resMapping    服务端返回字段映射
 */

import { AjaxType, JsonpType } from '../const'

// 对象类型
export type ObjectType<T = any> = Record<string, T>

export type Type = typeof JsonpType | typeof AjaxType
export type Url = string
export type Data = ObjectType
export type JsonpCallback = string
export type ResMapping = {
  ip: string
  [key: string]: string
}

export interface ElementType {
  url: Url
  jsonpCallback?: JsonpCallback
  resMapping?: ResMapping
  id?: string
  data?: Data
  type?: Type
}
