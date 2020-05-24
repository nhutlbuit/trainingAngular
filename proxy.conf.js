const PROXY_CONFIG = [
  {
    context: [
    "/trainingApi/"

    ],
    target: "http://localhost:8083",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
  }
];

module.exports = PROXY_CONFIG;