const axios = require('axios');
const store = require('./storage');
const crypto = require('./crypto');
const baseUrl = require('./config').baseUrl;

function genKey() {
  let keypair = crypto.Ed25519.gen();

  let sk = keypair.secretKey;
  let pk = keypair.publicKey;
  let seed = keypair.seed;

  store.set('seed', seed);
  store.set('public_key', pk);
  store.set('secret_key', sk);

  return pk;
}

function get(url, params) {
  let pk = store.get('public_key');
  let token = store.get('token');

  if (pk === undefined) { pk = genKey(); }
  if (token === undefined) { token = ''; }


  axios.get(`${baseUrl}/${url}`, {
    'headers': {
      'Public-Key-Header': pk,
      'Token-Header': token
    }
  }).then(r => {
    console.log(r);
  })
}

function main() {
  get('hello');
}

main();
// module.exports = {
//   get
// }
