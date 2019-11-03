const PROXY_CONFIG = [
  {
    context: [
    "/trainingApi/"

    ],
    target: "http://localhost:8083",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
  },
  {
    context: [
      "/member-market",
    ],
    target: "http://saqat.beatus88.net:8080",
    secure: false,
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
    headers: {host: 'saqat.beatus88.com'},
    cookieDomainRewrite: {
      ".beatus88.com": ".beatus88.net"
    }
  }
];

module.exports = PROXY_CONFIG;