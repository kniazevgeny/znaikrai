//const path = require('path');
//const PrerenderSPAPlugin = require('prerender-spa-plugin');
module.exports = {
  devServer: {
    disableHostCheck: true
  },
  assetsDir: 'static/',
  /*configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [ '/', '/about', '/stories', '/analytics' ],
      })
    ]
  }*/
}
