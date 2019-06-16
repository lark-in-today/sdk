import _store from "store";
import _req from "./req";
var module = {
  exports: {}
};
var exports = module.exports;
const r = _req;
const store = _store;

class Client {
  static verify() {
    let author = store.get('author');
    return r.get(`/_/verify?author=${author}`);
  }

}

export default module.exports;