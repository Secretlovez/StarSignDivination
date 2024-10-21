module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
  },
  globals: {
    SM2: 'readonly',
    BMap: 'readonly',
    ETARM: 'readonly',
    Cesium: 'readonly',
    Jessibuca: 'readonly',
    JessibucaPro: 'readonly',
    ComlinkWorker: 'readonly',
    defineOptions: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-recommended',
    '.eslintrc-auto-import.json',
  ],
  overrides: [],
  plugins: ['vue', 'cypress', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': [
      'error',
      { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_', ignoreRestSiblings: false },
    ],
    'vue/no-v-html': 'off', // 禁用v-html
    'vue/html-indent': 'off', // 限制html缩进
    'vue/max-attributes-per-line': 'off', // 限制每行属性数量
    'vue/multi-word-component-names': 'off', // 限制组件名称多词
    'vue/no-side-effects-in-computed-properties': 'off', // 限制计算属性副作用
    'vue/singleline-html-element-content-newline': 'off', // 限制元素内容换行
    'vue/component-options-name-casing': ['error', 'PascalCase'], // 限制组件选项名称大写
    'vue/component-definition-name-casing': ['error', 'PascalCase'], // 限制组件定义名称大写
    'vue/component-name-in-template-casing': [
      'error', // 限制组件模板名称大写,Element组件除外
      'PascalCase',
      { ignores: ['/^el-/'], registeredComponentsOnly: false },
    ],
    'vue/html-self-closing': [
      'error', // 限制标签关闭规则
      { html: { void: 'always', normal: 'never', component: 'any' }, math: 'always', svg: 'always' },
    ],
  },
};
