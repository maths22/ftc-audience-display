module.exports = {
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
  ],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.filter((r) => !r.test || !r.test.test('.css'))
    config.module.rules.push({
      test: /\.css$/,
      loaders: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            // context: path.resolve(__dirname, 'context'),
            importLoaders: 1,
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        }
      ]
    });

    // Return the altered config
    return config;
  },
};
