module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:vue/essential"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  settings: {
    // 别名
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src"],
          ["@components", "./src/components"],
          ["@scss", "./src/styles/"],
        ],
        extensions: [".js", ".vue"],
      },
    },

    // 扩展文件
    "import/extensions": [".js", ".vue"],
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    // import 导入规则
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     vue: 'never'
    //   }
    // ],
    "no-param-reassign": 0,
    "func-names": 0,
  },
};
