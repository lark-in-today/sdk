const c = require('./client');

c.get('clearloop').then(r => {
  console.log(r);
})
