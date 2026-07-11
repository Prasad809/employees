const CryptoJS = require("crypto-js");

const AES_KEY = "12345678901234567890123456789012";

function decryptAES(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, AES_KEY);

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}