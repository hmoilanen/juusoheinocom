const path = require('path')

module.exports = {
  lintOnSave: false,

  chainWebpack: config => {
    // For global style variables
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
  }
}

// For using global style variables
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/index.scss'),
      ],
    })
}
