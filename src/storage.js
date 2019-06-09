const store = require('store');

class Storage {
  static get(k) { return store.get(k) }
  static set(k, v) { return store.set(k, v) }
}

module.exports = Storage;
