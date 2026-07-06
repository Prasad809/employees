import CryptoJS from "crypto-js";
const AES_KEY = "12345678901234567890123456789012";

export const decryptAES = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, AES_KEY);

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};