module.exports = function (api) {
  var env = api.cache(() => process.env.NODE_ENV);

  return {
    plugins: ["macros"],
  };
};
