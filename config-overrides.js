const { alias } = require('react-app-rewire-alias')

module.exports = function override(config, env) {
    alias({
        '@components': './src/components',
        '@pages': './src/pages',
        '@constants': './src/constants',
        '@hoc': './src/hoc',
        '@hooks': './src/hooks',
        '@utils': './src/utils',
        '@styles': './src/assets/styles',
        '@routes': './src/routes',
        '@assets': './src/assets',
        '@context': './src/context',
        '@data': './src/data',
    })(config)

    return config
}