const { config } = require("../config/index");
const jwt = require("jsonwebtoken");
const SECRET = config.secret;
function sing(data) {
  return jwt.sign(data, SECRET);
}
const check = {
  own: function (req, id) {
    const decoded=decodeHeader(req);
    console.log('Decoded Token',decoded);
  },
};
function decodeHeader(req) {
  const authorization = req.headers.authorization || ""; //Obtenemos el id del usuario
  const token = getToken(authorization); //Obtenemos el token de la cabecera
  const decoded = verify(token); //verificamosel token
  req.user = decoded; //lo guardamos en caso de que querramos emplearlo mas tarde
}
function verify(token) {
    return jwt.verify(token,SECRET)
}
function getToken(authorization) {
  if (!authorization) {
    //verificamos que xista un token
    throw new Error("No viene token");
  }
  if (authorization.indexOf("Barer" === -1)) {
    //verificamos el formato del token
    throw new Error("Formato invalido");
  }
  let token=authorization.replace('Barer','')
  return token;
}
module.exports = {
  sing,
};
