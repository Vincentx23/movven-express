require('dotenv').config()
const app = require('./app');

//Funcion para iniciar el server de backend
async function main (){
    await app.listen(app.get('port'));
    console.log('Server on port: ' + app.get('port'));
}

//Arranca el server
main();