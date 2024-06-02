module.exports = function (api) {
  api.cache(true);
  const presets = [["babel-preset-expo"], ["@babel/preset-react", { runtime: "automatic" }]];
  return {
    presets,
  };
};
