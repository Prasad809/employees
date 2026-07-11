const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const fs = require("fs");

const AES_KEY = "12345678901234567890123456789012";
// const privateKey = fs.readFileSync("./private.pem", "utf8");

function decryptAES(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, AES_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// function decryptRSA(cipherText) {
//   const decrypted = crypto.privateDecrypt(
//     {
//       key: privateKey,
//       padding: crypto.constants.RSA_PKCS1_PADDING,
//     },
//     Buffer.from(cipherText, "base64")
//   );

//   return decrypted.toString("utf8");
// }

function decryptRequest(body, encType, lookUp) {
    const data = { ...body };

    const sensitiveFields = new Set(
        lookUp.map(item => item.value.toLowerCase())
    );

    Object.keys(data).forEach(key => {
        if (sensitiveFields.has(key.toLowerCase()) && data[key]) {
            if (encType === "AES") {
                data[key] = decryptAES(data[key]);
            } else if (encType === "RSA") {
                data[key] = decryptRSA(data[key]);
            }
        }
    });

    return data;   // <-- Don't forget this
}

module.exports = { decryptRequest }