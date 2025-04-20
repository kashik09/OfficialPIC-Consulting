export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        bootstrap: "readonly",
        console: "readonly"
      },
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "none" }],
      "eqeqeq": "error",
      "no-console": "off",
    },
  },
];