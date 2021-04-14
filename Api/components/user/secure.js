const auth = require('../../../auth/index');
module.exports=function checkOut(action){
    function middleware(req,res,next) {
        switch (action) {
            case 'update':
                const {id}=req.body;
                auth.check.own(req,id) 
                break;
        
            default:
                break;
        }
    }
}