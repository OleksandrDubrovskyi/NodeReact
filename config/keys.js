//Specifies what credentials to return

if(process.env.NODE_ENV == 'production') {
    //Production mode, return prod set of keys
    module.exports = require('./prod');
} else {
    //Development mode, return dev set of keys
    module.exports = require('./dev');
}