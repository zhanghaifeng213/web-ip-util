# 前端获取 ip 及位置信息工具

### Usage

```bash
npm install web-ip-util

import { getDefaultIpInfo } from 'web-ip-util'

getDefaultIpInfo([
{
    id: 'qq',
    data: {
        key: '输入腾讯位置服务申请的key'
    }
}
]).then(res => {
    console.log('res', res)
})
```
