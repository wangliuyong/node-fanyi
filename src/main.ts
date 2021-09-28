import * as https from 'https'
import * as querystring from 'querystring'
const md5 = require('md5')
import { appid, appSecret } from './private'

export const translate = (word: string) => {

  const salt = Math.random()
  const sign = md5(appid + word + salt + appSecret)
  let from, to
  // 匹配是不是英文
  const reEng = new RegExp("^[a-zA-Z]+$")
  if (reEng.test(word)) {
    from = 'en'
    to = 'zh'
  } else {
    from = 'zh'
    to = 'en'
  }
  // 百度翻译参数构造
  const query = querystring.stringify({
    q: word,
    from,
    to,
    appid,
    salt,
    sign
  });
  // 请求参数构造
  const options = {
    hostname: 'api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate?' + query,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    const chunks: Buffer[] = []
    res.on('data', (data) => {
      chunks.push(data)
      const jsonString = Buffer.concat(chunks).toString()
      type baiduRes = {
        error_code?: string,
        error_msg?: string,
        from: string,
        to: string,
        trans_result: {
          src: string,
          dst: string
        }[]
      }
      const res: baiduRes = JSON.parse(jsonString)
      if (res.error_code) {
        console.error(res.error_msg)
        process.exit(1)
      } else {
        console.log(res.trans_result[0].dst);
        process.exit(1)
      }
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();

}