module.exports = {
  "presets": [
    [
      '@babel/preset-env', {
        modules: false,
        // targets: {   node: '6.5', /* ES2015 compilation target */ },
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-transform-modules-umd",
    "@babel/plugin-transform-runtime",
    [
      "module-resolver", {
        "extensions": [".js"],
        "root": ["./src"],
        "alias": {
          "root": ".",
          "src": "./src",
          "dist": "./dist"
        }
      }
    ]
  ]
}