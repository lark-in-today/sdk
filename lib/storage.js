import _store from "store";
var module = {
  exports: {}
};
var exports = module.exports;
const store = _store;

class Storage {
  static get(k) {
    return store.get(k);
  }

  static set(k, v) {
    return store.set(k, v);
  }

}

module.exports = Storage;
export default module.exports;