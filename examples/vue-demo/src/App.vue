<template>
  <div>
    <div>
      <button @click="getDefaultIpInfo">
        <p>调用getDefaultIpInfo方法</p>
        <p>(默认配置)</p>
      </button>
      <button @click="getIpInfo">
        <p>调用getIpInfo方法</p>
        <p>(自定义配置)</p>
      </button>
      <button @click="getElementPromise">
        <p>调用getElementPromise方法</p>
        <p>(单个调用)</p>
      </button>
    </div>

    <h5>getDefaultIpInfo方法返回数据：</h5>
    <div>{{ defaultIpInfo }}</div>
    <h5>getIpInfo方法返回数据：</h5>
    <div>{{ ipInfo }}</div>
    <br />
    <h5>调用getElementPromise方法返回数据：</h5>
    <div>{{ elementPromise }}</div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {
  getIpInfo,
  getDefaultIpInfo,
  getElementPromise
} from '@web-ip-util/dist/web-ip-util.es5.js'
export default {
  name: 'App',
  data() {
    return {
      ipInfo: null,
      defaultIpInfo: null,
      elementPromise: null
    }
  },
  mounted() {
    // this.getIpInfo()
    // this.getDefaultIpInfo()
  },
  methods: {
    getIpInfo() {
      const config = [
        // {
        //   // https://apis.map.qq.com/ws/location/v1/ip?key=MVEBZ-QGPE6-JNESE-EDNRR-O5FST-NDBDZ&output=jsonp&callback=getLocation
        //   url: 'https://apis.map.qq.com/ws/location/v1/ip',
        //   data: {
        //     key: 'MVEBZ-QGPE6-JNESE-EDNRR-O5FST-NDBDZ',
        //     output: 'jsonp',
        //     callback: 'getLocation'
        //   },
        //   jsonpCallback: 'getLocation',
        //   resMapping: {
        //     ip: 'result.ip',
        //     city: 'result.ad_info.city',
        //     district: 'result.ad_info.district',
        //     province: 'result.ad_info.province'
        //   }
        // },
        // {
        //   url: 'https://whois.pconline.com.cn/ipJson.jsp',
        //   data: {
        //     level: '3'
        //   },
        //   jsonpCallback: 'IPCallBack',
        //   resMapping: {
        //     ip: 'ip',
        //     province: 'pro',
        //     city: 'city',
        //     district: 'region'
        //   }
        // },
        {
          id: 'ip-api',
          url: 'http://ip-api.com/json?callback=callback&lang=zh-CN',
          data: {
            // callback: 'callback',
            // lang: 'zh-CN'
          },
          jsonpCallback: 'callback',
          resMapping: {
            ip: 'query',
            province: 'regionName'
            // city: 'city',
            // district: 'region'
          }
        }
        // {
        //   id: 'ip-sb',
        //   url: 'https://api.ip.sb/jsonip',
        //   data: {
        //     callback: 'callback'
        //   },
        //   jsonpCallback: 'callback',
        //   resMapping: {
        //     ip: 'ip'
        //   }
        // }
      ]
      getIpInfo(config).then(res => {
        console.log('getIpInfo res', res)
        /* eslint-disable */
        const { extra, ...others } = res
        this.ipInfo = others
      })
    },
    getDefaultIpInfo() {
      getDefaultIpInfo([
        {
          id: 'qq',
          data: {
            key: 'MVEBZ-QGPE6-JNESE-EDNRR-O5FST-NDBDZ'
          }
        }
      ]).then(res => {
        console.log('getDefaultIpInfo res', res)
        /* eslint-disable */
        const { extra, ...others } = res
        this.defaultIpInfo = others
      })
    },
    getElementPromise() {
      const config = {
        url: 'http://ip-api.com/json',
        data: {
          callback: 'callback'
        },
        jsonpCallback: 'callback',
        resMapping: {
          ip: 'query'
        }
      }
      getElementPromise(config).then(res => {
        console.log('getElementPromise res', res)
        /* eslint-disable */
        const { extra, ...others } = res
        this.elementPromise = others
      })
    }
  }
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
