const r = require('./req');
const store = require('store');

class Client {
  static author() {
    let author = store.get('author');
    return r.get(`/_/exist?author=${author}`);
  }
}

export default Client;
