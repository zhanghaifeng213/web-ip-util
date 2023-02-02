import { JsonpType } from './const'
import { defaultConfig } from './default'
import { ElementType, ObjectType, ResMapping } from './types'
import { merge } from 'lodash-es'
import { promiseFactory } from './promiseFactory'

export function getElementPromise(element: ElementType, index: number) {
  return promiseFactory(element, index)
}

export function getIpInfo(config: ElementType[]) {
  const promiseArr = config.map((element, index) => {
    return getElementPromise(element, index)
  })
  return Promise.any(promiseArr).then((res: any) => {
    const resMapping: ResMapping = config[res.index].resMapping
    const result: ObjectType = {
      extra: { ...res }
    }
    Object.keys(resMapping).forEach(item => {
      const value = resMapping[item].split('.').reduce((pre: ObjectType, cur: string) => {
        return pre?.[cur]
      }, res)
      result[item] = value
    })
    if (!result.ip) {
      return Promise.reject(result)
    }
    return Promise.resolve(result)
  })
}

export function getDefaultConfig(config: ElementType[]): ElementType[] {
  return defaultConfig.map((item: ElementType) => {
    const findProps = config.find(it => it.id === item.id)
    const value: ElementType = {
      type: item.type || JsonpType,
      url: item.url,
      data: item.data,
      jsonpCallback: item.jsonpCallback,
      resMapping: item.resMapping
    }
    if (findProps) {
      return merge(value, findProps)
    }
    return value
  })
}

export function getDefaultIpInfo(defaultConfig: ElementType[]) {
  const config = getDefaultConfig(defaultConfig)
  return getIpInfo(config)
}
