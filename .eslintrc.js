module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'max-len': ["error", { "code": 160 }]
  }
};