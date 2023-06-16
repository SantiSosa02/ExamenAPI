const express = require('express')
const { dbConnection }= require('../dataBase/config')
const cors = require('cors')
const bodyParser = require('body-parser')

class Server{

    constructor(){
        this.app=express();
        this.port = process.env.port
        this.colegioPath = '/api/colegio';
        this.middleware();
        this.routes();
        this.conectarDB();
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }

    middleware(){
        this.app.use(express.static(__dirname + "/public"));
        this.app.use(cors());
        this.app.use(bodyParser.json());
    }

    routes(){
        this.app.use(this.colegioPath, require('../routes/colegios'))
    }

    async conectarDB(){
        await dbConnection()
    }
}

module.exports = {Server}