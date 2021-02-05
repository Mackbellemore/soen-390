module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300,
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
};
