const response = require('./response');
function errors(err,req,res,next) {
    console.log('[Errors]',err);
    const {message}=err||'Internal Error';
    const {statusCode}=err||500;
    response.error(req,res,message,statusCode)
}
module.exports={
    errors,
}