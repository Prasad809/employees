import CryptoJS from "crypto-js";
import { JSEncrypt } from "jsencrypt";

const AES_KEY = "12345678901234567890123456789012";

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAngWsTM2tNAi7/Y/Yxdpc
32ATxKosFNH0RKqXFlXjt0IroG9urlvgImjDtpGgdORLVhHaNeJfsDWHD9N7EAk3
qoeVFaNV/sUYSyqAg5+e/lRFwoE0xETahel+Q08xGiXRuMPKyymLoxCjcH4tdVIU
yWrhvNxOT98iFKCt4QKyqhkOkO/t6n61RCPYXeMCuEIj9NL3eJ71EraH7P8mvUHy
ILZb8q8KI2vHbsgEJpBepsv2DwzCQfEWwplChX3O09z/6UgG2k/0WaocAYGZqD4H
qki/8bt9o50pawcJk4opActy5OhTbfBAyCYyHxG+hxfima6BBlvzRTO9arsAS01a
KwIDAQAB
-----END PUBLIC KEY-----
`;

export const encryptRSA = (data) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(PUBLIC_KEY);  
  return encryptor.encrypt(String(data));
};

export const encryptAES = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    AES_KEY
  ).toString();
};
