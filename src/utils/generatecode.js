const crypto = require("crypto");

const generateCode = (codeLength = 6) => {
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    code += crypto.randomInt(0, 10);
  }
  return code;
};

module.exports = generateCode;
