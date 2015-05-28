module.exports = {
    beforeSend: function(req, res, next) {
        if(req.method !== 'GET') {
            return typeof next === 'function' ? next() : null;
        }

        console.log('EVENT', 'beforeSend', res.statusCode)
            
        next();
    },
    beforePhantomRequest: function(req, res, next) {
        if(req.method !== 'GET') {
            return typeof next === 'function' ? next() : null;
        }

        console.log('EVENT', 'beforePhantomRequest', res.statusCode)
            
        next();
    },
    onPhantomPageCreate: function(req, res, next) {
        if(req.method !== 'GET') {
            return typeof next === 'function' ? next() : null;
        }

        console.log('EVENT', 'onPhantomPageCreate', res.statusCode)
            
        next();
    },
    afterPhantomRequest: function(req, res, next) {
        if(req.method !== 'GET') {
            return typeof next === 'function' ? next() : null;
        }

        console.log('EVENT', 'afterPhantomRequest', res.statusCode)
            
        next();
    }
};