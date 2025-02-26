module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    {
      legacy: true,
    },
  ],
};
