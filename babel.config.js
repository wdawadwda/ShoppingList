module.exports = function (api) {
  api.cache(true);
  const presets = [["babel-preset-expo"], ["@babel/preset-react", { runtime: "automatic" }]];
  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
        },
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
