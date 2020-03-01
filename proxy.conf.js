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
      "/abc",
    ],
    target: "http://localhost.net:8080",
    secure: false,
    changeOrigin: true,
    ws: true,
    logLevel: "debug",
    headers: {host: 'abc.com'},
    cookieDomainRewrite: {
      ".abc.com": ".abc.net"
    }
  }
];

module.exports = PROXY_CONFIG;