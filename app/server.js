var express = require('express'),
    app = express(),
    http = require('http'),
    httpServer = http.Server(app),
    request=require('request');
app.use(require('prerender-node').set('prerenderServiceUrl', 'http://service.prerender.io/').set('prerenderToken', '0PWNrXZCdj6x5wj0QCgX'));

app.use(express.static(__dirname));



app.get('/', function (req, res) {
    res.sendfile('app/index.html');
});
var proxyRequest = function (req, res) {

    var path="http://10.142.0.2:8080" + req.url.replace("node-proxy/","");
    //var path="http://127.0.0.1:8080" + req.url.replace("node-proxy/","");

    req.pipe(request[req.method.toLowerCase()](path)).pipe(res);
};
app.post(/^\/(node-proxy)\/.+$/, proxyRequest);
app.get(/^\/(node-proxy)\/.+$/, proxyRequest);
app.all('*', function (req, res) {

    // Just send the index.html for other files to support HTML5Mode
    res.sendFile(__dirname +'/index.html');

});



//app.listen(8000, "127.0.0.1");
app.listen(80,"10.142.0.2");
