export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        __dirname: "readonly",
        process: "readonly",
        bootstrap: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "none" }],
      "eqeqeq": "error",
      "no-console": "off",
      "no-undef": "off",
    },
  },
];