module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            views: "./src/views",
            constants: "./src/constants",
          },
        },
      ],
    ],
  };
};
