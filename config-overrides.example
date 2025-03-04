const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    process: require.resolve('process/browser'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    url: require.resolve('url'),
    buffer: require.resolve('buffer'),
    assert: require.resolve('assert'),
    util: require.resolve('util')
  };

  // Add this new rule for handling Axios
  config.module = {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /node_modules\/axios\/lib\/.*\.js$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  return config;
}
const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    process: require.resolve('process/browser.js'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    url: require.resolve('url'),
    buffer: require.resolve('buffer'),
    assert: require.resolve('assert'),
    util: require.resolve('util')
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  return config;
}
