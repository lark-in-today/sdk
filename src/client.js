const r = require('./req');
const store = require('store');

class Client {
  static get(author) {
    return r.get(`/${author}`);
  }
  
  static post(art) {
    let author = store.get('author');
    return r.post(`/${author}`, art);
  }
}

module.exports = Client;
