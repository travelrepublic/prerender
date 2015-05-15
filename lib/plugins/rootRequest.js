module.exports = {
    beforePhantomRequest: function(req, res, next) {
        if(req.method !== 'GET') {
            return next();
        }

        if(req.prerender.url === ""){
            return res.send(200, "Success");
        }
            
        next();
    }
};