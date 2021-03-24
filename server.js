var express = require('express');
var compression = require('compression');
var proxy = require('http-proxy-middleware');
var buildPath = __dirname + '/dist/academy-student-evaluation';

// Initialize
var app = express();

// Serve static resources from 'build' folder
app.use(express.static(buildPath));

// Enable gzip response compression
app.use(compression());

// Enable proxy to api
app.use('/api', proxy({
    target: process.env.API_HOST,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/api': ''
    }
}));

// Otherwise serve index.html
app.get('/*', function (req, res) {
    res.sendFile(buildPath + "/index.html");
});

app.listen(process.env.PORT || 8080);
