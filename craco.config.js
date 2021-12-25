const CracoLessPlugin = require('craco-less');
// craco.config.js
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': 'black',
              '@menu-item-active-bg': 'transparent',
              '@table-header-bg': '#FFE1A8',
              '@table-header-color': 'black',
              '@calendar-bg': 'white',
              '@picker-basic-cell-active-with-range-color': 'white',
              '@picker-basic-cell-hover-color': 'whitesmoke',
              '@picker-basic-cell-hover-with-range-color': 'whitesmoke',
              '@dropdown-selected-color': 'whitesmoke',
              '@select-item-selected-bg': 'white',
              '@radio-dot-color': 'rgba(90, 149, 62, 1)',
              '@menu-inline-submenu-bg': 'white',
              '@checkbox-color': 'rgba(90, 149, 62, 1)',
              '@checkbox-size': '25px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}