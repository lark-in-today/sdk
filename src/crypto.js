const nacl = require('tweetnacl');
const {
  encodeBase64,
  decodeBase64
} = require('tweetnacl-util');
const store = require('./storage');
const config = require('./config');

class Ed25519 {
  static gen() {
    let seed = nacl.randomBytes(nacl.sign.seedLength);
    let kp = nacl.sign.keyPair.fromSeed(seed);
    kp.seed = seed;
    
    return kp;
  }

  static sign(msg, sk) {
    return nacl.sign.detached(msg, sk);
  }

  static verify(msg, sign, pk) {
    return nacl.sign.detached.verify(msg, sign, pk);
  }

  static genFromSeed() {
    let seed = decodeBase64(config.seed);
    let kp = nacl.sign.keyPair.fromSeed(seed);
    kp.seed = seed;
    
    return kp;
  }
}

function genKey() {
  let keypair = {};
  if (!config.debug) {
    keypair = Ed25519.gen();
  } else {
    keypair = Ed25519.genFromSeed();
  }
  
  let sk = encodeBase64(keypair.secretKey);
  let pk = encodeBase64(keypair.publicKey);
  let seed = encodeBase64(keypair.seed);

  store.set('seed', seed);
  store.set('public_key', pk);
  store.set('secret_key', sk);

  return pk;
}

module.exports = {
  Ed25519,
  encodeBase64, decodeBase64,
  genKey
}
