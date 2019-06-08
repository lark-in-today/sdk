const store = require('store');

function get(k) { return store.get(k) }
function set(k, v) { return store.set(k, v) }

module.exports = {
  get, set
}
