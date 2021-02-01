module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': [2, 'always'], // 强制结尾分号
    'arrow-parens': 0, // 要求箭头函数的参数使用圆括号
    'generator-star-spacing': 0, // 强制 generator 函数中 * 号周围使用一致的空格
    'no-tabs': 0, // disallow all tabs
    'indent': 0, // 强制使用一致的缩进
    'space-before-function-paren': 0, // 强制在 function的左括号之前使用一致的空格
    'no-extend-native': 0, // 禁止扩展原生对象
    'wrap-iife': 0, // 需要把立即执行的函数包裹起来
    'no-sequences': 0 // 禁止使用逗号运算符
  }
}
