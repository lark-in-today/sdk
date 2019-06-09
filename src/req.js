const axios = require('axios');
const store = require('./storage');
const crypto = require('./crypto');
const baseUrl = require('./config').baseUrl;

function auth(res, url, params) {
  if (res.data.msg.match(/WARNING_000/)) {

    let _tk = '' + res.data.token;
    let token = crypto.decodeBase64(res.data.token);
    let sk = crypto.decodeBase64(store.get('secret_key'));
    let stoken = crypto.encodeBase64(crypto.Ed25519.sign(token, sk));

    store.set('token', _tk);
    store.set('signed_token', stoken);

    let ret = crypto.Ed25519.verify(
      crypto.decodeBase64(_tk),
      crypto.decodeBase64(stoken),
      crypto.decodeBase64(store.get('public_key')),
    );

    return Request.get(url, params);
  } else if(res.data.msg.match(/OK_000/)) {
    return Request.get(url, params);
  } else {
    return res.data;
  }
}

class Request {
  static request(method, url, params) {
    let pk = store.get('public_key');
    let token = store.get('token');
    let stoken = store.get('signed_token');

    if (pk === undefined) { pk = crypto.genKey(); }
    if (token === undefined) { token = ''; }
    if (stoken === undefined) { stoken = ''; }

    return axios.request({
      url: `${baseUrl}/${url}`,
      headers: {
	'public-key-header': pk,
	'token-header': token,
	'signed-token-header': stoken
      },
      method: method,
    }).then(
      res => auth(res, url, params)
    );
  }

  static get(url, params) {
    return Request.request('GET', url, params);
  }

  static post(url, params) {
    return Request.request('POST', url, params);
  }
}

function main() {
  Request.get('hello').then(r => {
    console.log(r);
  })
}

main();
// module.exports = {
//   get
// }
