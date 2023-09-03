/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@elements': path.resolve(__dirname, 'src/elements'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    }
  },
};