/** @type {import("prettier").Config} */
// prettier.config.js
module.exports = {
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ["prettier-plugin-organize-imports","prettier-plugin-tailwindcss"],
  "pluginSearchDirs": false
};
