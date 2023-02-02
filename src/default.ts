import { ElementType } from './types'

/**
 * 文档地址：https://lbs.qq.com/service/webService/webServiceGuide/webServiceIp
 */
export const qqDefaultConfig: ElementType = {
  // https://apis.map.qq.com/ws/location/v1/ip?key=MVEBZ-QGPE6-JNESE-EDNRR-O5FST-NDBDZ&output=jsonp&callback=getLocation
  id: 'qq',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
    key: '',
    output: 'jsonp',
    callback: 'getLocation'
  },
  jsonpCallback: 'getLocation',
  resMapping: {
    ip: 'result.ip',
    province: 'result.ad_info.province',
    city: 'result.ad_info.city',
    district: 'result.ad_info.district'
  }
}
/**
 * 文档地址：https://whois.pconline.com.cn/
 */
export const pconlineDefaultConfig: ElementType = {
  id: 'pconline',
  url: 'https://whois.pconline.com.cn/ipJson.jsp',
  data: {
    level: '3'
  },
  jsonpCallback: 'IPCallBack',
  resMapping: {
    ip: 'ip',
    province: 'pro',
    city: 'city',
    district: 'region'
  }
}
/**
 * 文档地址：http://ip-api.com/json
 */
// http://ip-api.com/json?lang=zh-CN
// http://ip-api.com/json/?lang=zh-CN&callback={callback}
export const ipApiDefaultConfig: ElementType = {
  id: 'ip-api',
  url: 'http://ip-api.com/json',
  data: {
    callback: 'callback',
    lang: 'zh-CN'
  },
  jsonpCallback: 'callback',
  resMapping: {
    ip: 'query',
    province: 'regionName'
    // city: 'city',
    // district: 'region'
  }
}
/**
 * 文档地址：https://ip.sb/api/
 */
// https://api.ip.sb/jsonip?callback=getip
export const ipSbDefaultConfig: ElementType = {
  id: 'ip-sb',
  url: 'https://api.ip.sb/jsonip',
  data: {
    callback: 'callback'
  },
  jsonpCallback: 'callback',
  resMapping: {
    ip: 'query',
    province: 'regionName'
    // city: 'city',
    // district: 'region'
  }
}

/**
 * 文档地址：https://www.myip.la/
 */
// TODO ajax
// https://api.myip.la/cn?json
export const myipDefaultConfig: ElementType = {
  id: 'myip',
  type: 'AJAX',
  url: 'https://api.myip.la/cn?json',
  resMapping: {
    ip: 'ip',
    province: 'location.province',
    city: 'location.city'
    // district: 'region'
  }
}

export const defaultConfig: ElementType[] = [
  qqDefaultConfig,
  pconlineDefaultConfig,
  ipApiDefaultConfig,
  ipSbDefaultConfig
]
