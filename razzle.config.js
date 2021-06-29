/* eslint-env node */

const path = require('path');
const webpack = require('webpack');


module.exports = {
  plugins: [ 'graphql' ],

  modifyWebpackConfig(opts) {
    const isClient = opts.env.target === 'web';
    const config = opts.webpackConfig;

    if( isClient ) {
      config.output.filename = opts.env.dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';

      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          hidePathInfo: true,

          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
            },
          },
        },
      };
    }

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.APOLLO_STATE_KEY': JSON.stringify(process.env.APOLLO_STATE_KEY),
      'process.env.I18N_STATE_KEY': JSON.stringify(process.env.I18N_STATE_KEY),
      'process.env.USER_ID_PARAM': JSON.stringify(process.env.USER_ID_PARAM),
      'process.env.DEFAULT_LANGUAGE': JSON.stringify(process.env.DEFAULT_LANGUAGE),
    }));

    config.resolve.alias = {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@split': path.resolve(
        __dirname,
        'src',
        isClient ? 'client' : 'server',
      ),
    };

    return config;
  },

  modifyBabelOptions(config, env) {
    if( env.target === 'web' ) {
      config.plugins.push([
        "babel-plugin-import", {
          "libraryName": "@material-ui/core",
          "libraryDirectory": "esm",
          "camel2DashComponentName": false
        },
        "@material-ui/core"
      ]);
      config.plugins.push([
        "babel-plugin-import", {
          "libraryName": "@material-ui/icons",
          "libraryDirectory": "esm",
          "camel2DashComponentName": false
        },
        "@material-ui/icons"
      ]);
    }

    return config;
  }
};

// UGH I FUCKING HATE REGENERATOR GOD FUCKING DAMN
