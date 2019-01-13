module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-modules-umd",
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        "extensions": [".js"],
        "root": ["./src"],
        "alias": {
          "root": ".",
          "src": "./src"
        }
      }
    ]
  ]
}