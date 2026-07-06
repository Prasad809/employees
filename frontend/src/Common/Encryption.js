import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

const AES_KEY = "12345678901234567890123456789012";

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A52frSghyhEdghj52hgj
-----END PUBLIC KEY-----
`;

export const encryptRSA = (data) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUBLIC_KEY);
  console.log(data,encryptor.encrypt(String(data)),encryptor.encrypt(String("1234")));
  
  return encryptor.encrypt(String(data));
};

export const encryptAES = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    AES_KEY
  ).toString();
};
