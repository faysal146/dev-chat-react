const {
    addWebpackAlias,
    override,
    addBabelPlugin,
    addLessLoader,
} = require('customize-cra');
const path = require('path');

module.exports = override(
    addBabelPlugin('react-hot-loader/babel'),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
        'react-dom':
            process.env.NODE_ENV === 'production'
                ? 'react-dom'
                : '@hot-loader/react-dom',
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                // '@font-family-base': 'var(--font-family)',
                // '@font-size-base': 'var(--base-font-size)',
            },
        },
    })
);
