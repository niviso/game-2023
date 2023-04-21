module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@/components": "./components/",
            "@/types": "./types/",
            "@/views": "./views/",
            "@/helpers": "./helpers/",
            "@/constants": "./constants/",
            "@/contexts": "./contexts/",
          },
        },
      ],
    ],
  };
};
