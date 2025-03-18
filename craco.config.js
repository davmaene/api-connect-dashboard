const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // primary color for hewagri
            modifyVars: { '@primary-color': '#048343', '@secondary-color': "#ff7f00" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};