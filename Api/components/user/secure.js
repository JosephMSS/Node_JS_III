const auth = require('../../../auth/index');
function checkOut(action){
    function middleware(req,res,next) {
        switch (action) {
            case 'update':
                const {id}=req.body;
                auth.check.own(req,id) 
                next();
                break;
        
            default:
                break;
        }
    }
    return middleware
}
module.exports={
    checkOut,
}