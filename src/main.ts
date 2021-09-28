import * as https from 'https'
import * as querystring from 'querystring'



export const translate = (english) => {
  console.log(english);

  const xx = querystring.stringify({
    q: english,
    from: 'en',
    to: 'zh',
    appid: '20180930000214641',
    salt: Math.random(),
    sign: ''
  });

  const options = {
    hostname: 'http://api.fanyi.baidu.com',
    port: 443,
    path: '/api/trans/vip/translate',
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