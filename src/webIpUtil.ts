import { JsonpType, ResMappingDefault } from './const'
import { defaultConfig } from './default'
import { ElementType, ObjectType, ResMapping } from './types'
import { promiseFactory } from './core/promiseFactory'
import { deepMerge } from './utils/deepMerge'

export function getElementPromise(element: ElementType, index: number) {
  return promiseFactory(element, index)
}

export function getIpInfo(config: ElementType[]) {
  const promiseArr = config.map((element, index) => {
    return getElementPromise(element, index)
  })
  return Promise.any(promiseArr).then((res: any) => {
    const resMapping: ResMapping = config?.[res.index]?.resMapping || ResMappingDefault
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

function mergeDefaultConfig(config: ElementType[]): ElementType[] {
  return defaultConfig.map((item: ElementType) => {
    const findProps = config.find(it => it.id === item.id)
    if (findProps) {
      return deepMerge(item, findProps)
    }
    return item
  })
}

export function getDefaultIpInfo(defaultConfig: ElementType[]) {
  const config = mergeDefaultConfig(defaultConfig)
  return getIpInfo(config)
}
