const PROXY_CONFIG = [
    {
        context: [
            '/api',
            '/services',
            '/management',
            '/swagger-resources',
            '/v2/api-docs',
            '/h2-console',
            '/oauth2',
            '/login',
            '/auth'
        ],
        target: "http://localhost:8080",
        secure: false,
        changeOrigin: false
    }
]

module.exports = PROXY_CONFIG;

// var HttpsProxyAgent = require('https-proxy-agent');
// var proxyConfig = [{
//     context: [
//         '/api',
//         '/services',
//         '/management',
//         '/swagger-resources',
//         '/v2/api-docs',
//         '/h2-console',
//         '/oauth2',
//         '/login',
//         '/auth'
//     ],
//     target: 'http://localhost:8080',
//     secure: false
// }];

// function setupForCorporateProxy(proxyConfig) {
//     var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
//     if (proxyServer) {
//         var agent = new HttpsProxyAgent(proxyServer);
//         console.log('Using corporate proxy server: ' + proxyServer);
//         proxyConfig.forEach(function (entry) {
//             entry.agent = agent;
//         });
//     }
//     return proxyConfig;
// }

// module.exports = setupForCorporateProxy(proxyConfig);