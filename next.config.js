const { defaultLang, langs } = require("./config");

module.exports = {
  reactStrictMode: false,

  i18n: {
    locales: langs,
    defaultLocale: defaultLang,
  },

  async rewrites() {
    return [];
  },
};
