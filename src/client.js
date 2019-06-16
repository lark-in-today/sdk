const r = require('./req');
const store = require('store');

class Client {
  static verify() {
    let author = store.get('author');
    return r.get(`/_/verify?author=${author}`);
  }
}

export default Client;
