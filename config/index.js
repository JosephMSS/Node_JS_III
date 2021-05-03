require("dotenv").config();
const config={
removeDB:process.env.REMOTE_DB||false,
 port:process.env.PORT,
 dbUser:process.env.DB_USER,
 dbPassword:process.env.DB_PASSWORD,
 dbHost:process.env.DB_HOST,
 dbPort:process.env.DB_PORT,
 dbName:process.env.DB_NAME,
 host:process.env.HOST ||'http://localhost',
 publicRoute:process.env.PUBLIC_ROUTE,
 filesRoute:process.env.FILES_ROUTE,
 secret:process.env.SECRET,
mysql_service:{
    port:process.env.MYSQL_SERVICE_PORT||3001,
    host:process.env.MYSQL_SERVICE_LOCAL_HOST||'localhost'
},
post_service:{
    port:process.env.POST_SERVICE_PORT||3002,
    host:process.env.POST_SERVICE_LOCAL_HOST||'localhost'
}
}
module.exports={config}