# PM2
> npm i pm2

Comando | Uso
--------|----
 `pm2 logs`| Iniciamos el demon de pm2 y vemos los logs de los procesos.
 `pm2 status`|  Vemos los procesos activos.
 `pm2 start [filename] --name [process_name]` | Iniciamos el proceso de un archivo.
`pm2 logs [index]`| Vemos los logs de un proceso en especifico
`pm2 stop [index]`| Detiene el proceso, podemos detener mas procesos solo agregando el indice de los procesos.
`pm2 restart [index]`| Restalece los servicios