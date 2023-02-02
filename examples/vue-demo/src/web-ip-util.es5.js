/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
  var t = {}
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
      if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]]
  return t
}

var JsonpDefault = 'callback'
var jsonpCallbackDefault = 'callback'

/**
 * @param {string} url           请求地址
 * @param {object} data          请求参数
 * @param {string} jsonp         请求参数key值，默认callback
 * @param {string} jsonpCallback 请求参数value值，默认callback
 */
var jsonp = function(_a) {
  var url = _a.url,
    _b = _a.data,
    data = _b === void 0 ? {} : _b,
    _c = _a.jsonp,
    jsonp = _c === void 0 ? JsonpDefault : _c,
    _d = _a.jsonpCallback,
    jsonpCallback = _d === void 0 ? jsonpCallbackDefault : _d
  return new Promise(function(resolve, reject) {
    //定义一个处理Jsonp返回数据的回调函数 默认callback
    // @ts-ignore
    window[jsonpCallback] = function(res) {
      return resolve(res)
    }
    // 创建一个script标签
    var script = document.createElement('script')
    // 插入callback参数
    data[jsonp] = jsonpCallback
    // 将参数转为 key1=value1&key2=value2格式
    var params = Object.entries(data)
      .map(function(item) {
        return item.join('=')
      })
      .join('&')
    script.setAttribute('src', url + '?' + params)
    // 临时插入head中
    document.head.appendChild(script)
    script.onload = function() {
      // 请求完删除冗余script标签
      document.head.removeChild(script)
    }
    script.onerror = function() {
      return reject('加载失败')
    }
  })
}

var WebIpUtil = /** @class */ (function() {
  function WebIpUtil(config, promiseMethodType) {
    this.config = config
    this.promiseMethodType = promiseMethodType || 'all'
    this.promiseArr = this.config.map(function(item) {
      var type = item.type,
        others = __rest(
          item,
          // TODO 根据type判断类型进行处理
          ['type']
        )
      // TODO 根据type判断类型进行处理
      return jsonp(others)
    })
  }
  WebIpUtil.prototype.run = function() {
    return Promise.all(this.promiseArr)
  }
  return WebIpUtil
})()

/**
 * @param {string} type          请求类型
 * @param {string} url           请求地址
 * @param {object} data        请求参数
 * @param {string} jsonp         请求参数key值，默认callback
 * @param {string} jsonpCallback 请求参数value值，默认callback
 */

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)

export default WebIpUtil
//# sourceMappingURL=web-ip-util.es5.js.map
