const multiEntry = require("rollup-plugin-multi-entry");

module.exports = {
  input: "src/index.js",
  plugins: [multiEntry()],
  output: {
    file: 'src/index.js',
    format: 'umd'
  }
};
