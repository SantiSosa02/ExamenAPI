require('dotenv').config() //importamos el paquete de dotenv
const { Server }= require('./models/server')  //
const server = new Server()  // instanciamos el objeto
server.listen()