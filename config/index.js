require("dotenv").config();
const config={
 port:process.env.PORT,
 dbUser:process.env.DB_USER,
 dbPassword:process.env.DB_PASSWORD,
 dbHost:process.env.DB_HOST,
 dbPort:process.env.DB_PORT,
 dbName:process.env.DB_NAME,
 host:process.env.HOST,
 publicRoute:process.env.PUBLIC_ROUTE,
 filesRoute:process.env.FILES_ROUTE,
 secret:process.env.SECRET,
}
module.exports={config}