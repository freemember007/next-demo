const withStylus = require('@zeit/next-stylus')
const withLess = require('@zeit/next-less')

module.exports = withLess(withStylus({

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {

    return config

  },

  webpackDevMiddleware: config => {

    return config

  }

}))
