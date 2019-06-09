const r = require('./req');

class Templates {
  static req() {
    r.get('/hello').then(r => console.log);
  }
  
  static post_an_article() {
    r.post('/name').then(r =>{
      console.log(r)
    })
  }
}

function main() {
  // Templates.req();
  
  Templates.post_an_article();
}

main();
