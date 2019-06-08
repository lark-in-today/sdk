const nacl = require('tweetnacl');
const {
  encodeBase64,
  decodeBase64
} = require('tweetnacl-util');

class Ed25519 {
  static gen() {
    let seed = nacl.randomBytes(nacl.sign.seedLength);
    let kp = nacl.sign.keyPair.fromSeed(seed);
    kp.seed = seed;
    
    return kp;
  }

  static sign(msg, sk) {
    return nacl.sign(msg, sk);
  }

  static verify(msg, sign, pk) {
    return nacl.sign.detached.verify(msg, sign, pk);
  }
}



module.exports = {
  Ed25519, encodeBase64, decodeBase64
}
