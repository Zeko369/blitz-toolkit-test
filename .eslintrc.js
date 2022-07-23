module.exports = {
  extends: require.resolve("@blitzjs/next/eslint"), // Own config
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/no-floating-promises": "warn",
      }
    }
  ]
}
