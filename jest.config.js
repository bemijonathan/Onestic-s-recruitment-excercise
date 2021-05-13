module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)|json"],
  transformIgnorePatterns: ["/node_modules/(?!moment)"],
  modulePathIgnorePatterns: ["cypress"]

}