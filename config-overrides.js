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
    util: require.resolve('util'),
    zlib: require.resolve('browserify-zlib')
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  // Only add this if you're still seeing the fullySpecified error
  config.module = {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  };

  return config;
}