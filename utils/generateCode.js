const generateCode = (codeLength) => {
  const num = String(Math.random()).split(".")[1].split("");
  const length = num.length;

  let code = "";

  if (!codeLength) {
    codeLength = 4;
  }

  for (let i = 0; i < codeLength; i++) {
    code = code + num[length - (i + 1)];
  }

  return code;
};

module.exports = generateCode;
