module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network"
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    proxy: "http://localhost:8080"
    // public: "192.168.9.12:8080"
    // host: "0.0.0.0",
    // port: 8080
  }
};
