export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
    },
    env: {
      node: true,
      browser: true,
    },
    globals: {
      bootstrap: "readonly",
    },
    rules: {
      "no-unused-vars": ["warn", { "vars": "all", "args": "none" }],
      "no-undef": "off",
      "eqeqeq": "error",
      "no-console": "off",
    },
  },
];