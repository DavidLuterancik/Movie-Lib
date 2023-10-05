module.exports = function (api) {
  var env = api.cache(() => process.env.REACT_APP_NODE_ENV);

  return {
    plugins: ["macros"],
  };
};
