import _jsSha from "js-sha256";
import _config from "./config";
import _storage from "./storage";
import { encodeBase64, decodeBase64 } from "tweetnacl-util";
import _tweetnacl from "tweetnacl";
var module = {
  exports: {}
};
var exports = module.exports;
const nacl = _tweetnacl;
const store = _storage;
const config = _config;
const sha256 = _jsSha.sha256;

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

class Crypto {
  static genKey() {
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

}

Crypto.__proto__.Ed25519 = Ed25519;
Crypto.__proto__.decodeBase64 = decodeBase64;
Crypto.__proto__.encodeBase64 = encodeBase64;
module.exports = Crypto;
export default module.exports;