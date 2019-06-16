import _crypto from "./crypto";
import _req from "./req";
var module = {
  exports: {}
};
var exports = module.exports;
const r = _req;
const crypto = _crypto;

class Templates {
  static req() {
    r.get('/hello').then(r => console.log);
  }

  static post_an_article() {
    let art = {
      title: '42',
      content: '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',
      summary: 'The answer to life, the universe, and everything.'
    };
    return r.post('/name', '', art).then(r => r).catch(r => r.response.data);
  }

}

function main() {
  // Templates.req();
  Templates.post_an_article().then(r => {
    console.log(r);
  });
}

main();
export default module.exports;