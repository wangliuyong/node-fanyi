import * as https from 'https'
import * as querystring from 'querystring'
const md5 = require('md5')
import { appid, appSecret } from './private'

export const translate = (english) => {

  const salt = Math.random()
  const sign = md5(appid + english + salt + appSecret)

  const query = querystring.stringify({
    q: english,
    from: 'en',
    to: 'zh',
    appid,
    salt,
    sign
    // appid+q+salt+密钥的MD5值  
  });

  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    const chunks = []
    res.on('data', (data) => {
      chunks.push(data)
      const jsonString = Buffer.concat(chunks).toString()
      const res = JSON.parse(jsonString)
      console.log(res);

    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();

}