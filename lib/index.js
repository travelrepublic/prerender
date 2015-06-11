var cluster = require('cluster')
  , os = require('os')
  , fs = require('fs')
  , path = require('path')
  , http = require('http')
  , _ = require('lodash')
  , util = require('./util')
  , basename = path.basename;

// Starts either a server or client depending on whether this is a master or
// worker cluster process
exports = module.exports = function(options) {
    var port = options.port || process.env.PORT || 3000;
    var hostname = options.hostname || process.env.NODE_HOSTNAME || undefined;

    var max504s = options.max504s || process.env.MAX_504s || 5;
    var max504timeout = options.max504timeout || process.env.MAX_504_TIMEOUT || 60;

    var restartFile = options.restartFile || process.env.RESTART_FILE || '';

    if(!options.phantomBasePort) {
        options.phantomBasePort = process.env.PHANTOM_CLUSTER_BASE_PORT || 12300;
    }

    var server = require('./server');
    options.isMaster = cluster.isMaster;
    options.worker = cluster.worker;
    server.init(options);

    if(cluster.isMaster) {

        for (var i = 0; i < (options.workers || os.cpus().length); i += 1) {
            util.log('starting worker thread #' + i);
            cluster.fork();
        }

        cluster.on('exit', function (worker) {
            util.log('worker ' + worker.id + ' died, restarting!');
            cluster.fork();
        });
    } else {
        var httpServer = http.createServer(_.bind(server.onRequest, server));

        httpServer.listen(port, hostname, function () {
            util.log('Server running on port ' + port);
        });

        var lastMessage = +new Date() / 1000;
        var counter = 0;

        if(restartFile.length > 0){
            util.ev.on('status', function(code){
                var thisMessage = (+new Date() / 1000);

                if(thisMessage - lastMessage >= max504timeout){
                    counter = 0;
                    lastMessage = thisMessage;
                } else {
                    if(code === 504){
                        counter++;
                        if(counter >= max504s){
                            util.log('Creating restart signal for the machine now');
                            fs.writeFile(restartFile, '', function(err){
                                if(err){
                                    util.log('Creating restart signal failed');
                                }
                            })
                            //cluster.worker.kill();
                        }
                    }
                }        
            });
        }
    }

    return server;
};

fs.readdirSync(__dirname + '/plugins').forEach(function(filename){
    if (!/\.js$/.test(filename)) return;
    var name = basename(filename, '.js');
    function load(){ return require('./plugins/' + name); }
    Object.defineProperty(exports, name, {value: load});
});
