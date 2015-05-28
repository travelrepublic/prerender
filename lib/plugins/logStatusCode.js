module.exports = {
    beforeSend: function(req, res, next) {
        if(req.method !== 'GET') {
            return next();
        }

        console.log('EVENT', 'beforeSend', res.statusCode)
            
        next();
    },
    beforePhantomRequest: function(req, res, next) {
        if(req.method !== 'GET') {
            return next();
        }

        console.log('EVENT', 'beforePhantomRequest', res.statusCode)
            
        next();
    },
    onPhantomPageCreate: function(req, res, next) {
        if(req.method !== 'GET') {
            return next();
        }

        console.log('EVENT', 'onPhantomPageCreate', res.statusCode)
            
        next();
    },
    afterPhantomRequest: function(req, res, next) {
        if(req.method !== 'GET') {
            return next();
        }

        console.log('EVENT', 'afterPhantomRequest', res.statusCode)
            
        next();
    }
};