module.exports = api => {
  api.cache(true);

  return {
    presets: ["module:metro-react-native-babel-preset", "react-native"],
    plugins: [
      [
        "babel-plugin-root-import",
        {
          rootPathSuffix: "./",
          rootPathPrefix: "~"
        }
      ]
    ]
  };
};
