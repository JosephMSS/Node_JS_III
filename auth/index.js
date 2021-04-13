const jwt = require('jsonwebtoken');
function sing(data) {
   return jwt.sign(data,'secret')
}
module.exports={
    sing,
}