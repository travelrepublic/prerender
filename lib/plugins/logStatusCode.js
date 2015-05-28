module.exports = {
    beforeSend: function(req, res, next) {
        if(req.method === 'GET') {
            console.log('EVENT', 'beforeSend', res.statusCode)
        }
            
        if(next)
        {
            next();
        }
    },
    beforePhantomRequest: function(req, res, next) {
        if(req.method === 'GET') {
            console.log('EVENT', 'beforePhantomRequest', res.statusCode)
        }

        if(next)
        {
            next();
        }
    },
    onPhantomPageCreate: function(req, res, next) {
        if(req.method === 'GET') {
            console.log('EVENT', 'onPhantomPageCreate', res.statusCode)
        }


        if(next)
        {
            next();
        }
    },
    afterPhantomRequest: function(req, res, next) {
        if(req.method === 'GET') {
            console.log('EVENT', 'afterPhantomRequest', res.statusCode)
        }
            
        if(next)
        {
            next();
        }
    }
};