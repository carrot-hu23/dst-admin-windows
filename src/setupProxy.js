// const proxy = require('http-proxy-middleware');
// module.exports = function (app) {
//     app.use('/dst', proxy({
//         target: 'https://dst.liuyh.com/',//目标地址
//         secure: false,
//         changeOrigin: true,
//         pathRewrite: {
//             "^/user": "/user"
//         },
//     }));
// };
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    // app.use(createProxyMiddleware('/api', {
    //     "target": "https://getman.cn",
    //     "changeOrigin": true,
    // }));

    app.use(createProxyMiddleware('/dst', {
        target: "https://dst.liuyh.com/",
        changeOrigin: true,
        pathRewrite: {
            '^/dst': ''
        },
    }))
    app.use(createProxyMiddleware('/api', {
        target: "http://1.12.223.51:8888/",
        changeOrigin: true,
        // pathRewrite: {
        //     '^/dst': ''
        // },
    }))
    app.use(createProxyMiddleware('/version', {
        target: "http://ver.tugos.cn",
        changeOrigin: true,
        pathRewrite: {
            '^/version': ''
        },
    }))
}