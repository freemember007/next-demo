const withStylus = require('@zeit/next-stylus') 

module.exports = withStylus({

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {

    return config

  },

  webpackDevMiddleware: config => {

    return config

  }

})
