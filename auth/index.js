const { config } = require("../config/index");
const{err}=require('../utils/error')
const jwt = require("jsonwebtoken");
const SECRET = config.secret;
function sing(data) {
  console.log('JMMS_JSON.stringify(data)',JSON.stringify(data))
  return jwt.sign(JSON.stringify(data), SECRET);
}
const check = {
  own: function (req, id) {
    const decoded = decodeHeader(req);

    console.log("Decoded Token", decoded);
    if (decoded.id !== id) {
      throw err('No puedes hacer esto',401);
 
    }
  },
};
function decodeHeader(req) {
  const authorization = req.headers.authorization || ""; //Obtenemos el id del usuario
  const token = getToken(authorization); //Obtenemos el token de la cabecera
  const decoded = verify(token); //verificamosel token
  console.log("decode header", decoded);
  req.user = decoded; //lo guardamos en caso de que querramos emplearlo mas tarde
  return decoded; 
}
function verify(token) {
  return jwt.verify(token, SECRET);
}
function getToken(authorization) {
  if (!authorization) {
    //verificamos que xista un token
    throw err("No viene token",400);
  }
  console.log(authorization);
  if (authorization.indexOf("Bearer") === -1) {
    //verificamos el formato del token
    throw err("Formato invalido",400);
  }
  let token = authorization.replace("Bearer", "");
  return token.trim();
}
module.exports = {
  sing,
  check,
};
