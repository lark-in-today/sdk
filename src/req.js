const axios = require('axios');
const store = require('./storage');
const crypto = require('./crypto');
const baseUrl = require('./config').baseUrl;

class Requests {
  static auth(res, url, params, data) {
    let method = res.config.method;
    if (res.data.err_msg) {
      return res.data.err_msg;
    }
    
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

      return Requests[method](url, params, data);
    } else if(res.data.msg.match(/OK_000/)) {
      return Requests[method](url, params, data);
    } else {
      return res.data;
    }
  }
  
  static request(method, url, params, data) {
    let pk = store.get('public_key');
    let token = store.get('token');
    let stoken = store.get('signed_token');

    if (pk === undefined) { pk = crypto.genKey(); }
    if (token === undefined) { token = ''; }
    if (stoken === undefined) { stoken = ''; }

    return axios({
      url: `${baseUrl + url}`,
      headers: {
	'public-key-header': pk,
	'token-header': token,
	'signed-token-header': stoken
      },
      method: method,
      params: params,
      data: data,
    }).then(
      res => Requests.auth(res, url, params, data)
    );
  }

  static get(url, params, data) {
    return Requests.request('GET', url, params, data);
  }

  static put(url, params, data) {
    return Requests.request('PUT', url, params, data);
  }
  
  static post(url, params, data) {
    return Requests.request('POST', url, params, data);
  }
}

module.exports = Requests;
