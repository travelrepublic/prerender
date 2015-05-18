module.exports = {
    beforePhantomRequest: function(req, res, next) {
        if(req.method !== 'GET') {
            return next();
        }

        if(req.prerender.url === ""){
            var msg = 'Success ';
            if(process.env.PHANTOM_CACHE_ENABLED === "1") {
                msg += '(c) ';
            }
            if (process.env.S3_PREFIX_KEY) {
                msg += '(v ' + process.env.S3_PREFIX_KEY + ') ';
            }
            return res.send(200, msg);
        }
            
        next();
    }
};