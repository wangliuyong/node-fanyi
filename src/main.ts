import * as https from 'https'
import * as querystring from 'querystring'
const md5 = require('md5')

export const translate = (english) => {
  console.log(english);

  const appid = '20180930000214641'
  const appSecret = 'DbpdusNoDRD4Eu3vieVb'
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
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();

}