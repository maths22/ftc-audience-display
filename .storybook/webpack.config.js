path = require('path')

module.exports =  async ({ config, mode }) => {
  config.module.rules = config.module.rules.filter((el) => !el.test.test('.css'))
  config.module.rules.push({
        test: /\.css$/,
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              context: path.resolve(__dirname, 'context'),
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          }
        ],
      })

  return config;
}
