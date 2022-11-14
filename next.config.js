module.exports = {
  reactStrictMode: false,

  i18n: {
    locales: ["en", "tr", "de"],
    defaultLocale: "en",
  },

  async rewrites() {
    return [
      {
        source: "/movie/:id/:slug",
        destination: "/movie/:id",
      },
    ];
  },
};
