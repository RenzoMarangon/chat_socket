const cors = require('cors')
const express = require('express');
const { dbConnection } = require('../database/config');
const { createServer } = require('http');
const { socketController } = require('../sockets/controller');



class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;     
        
        this.server = createServer( this.app );
        this.io = require('socket.io')(this.server);

        this.paths = 
        {
            auth : '/api/auth',
            users : '/api/users'
        }

        //MONGOOSE
        this.connectDB()

        //MIDDLEWARES
        this.middlewares();

        //ROUTES
        this.routes();

        //Socket.io
        this.sockets();
    }


    async connectDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
          this.app.use(cors({
            origin: '*'
          }));            

        //Lectura y <parseo del body
        this.app.use( express.json()  );

        //Pagina publica
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use( this.paths.auth , require('../routes/auth') );
        this.app.use( this.paths.auth ,require('../routes/users'));

    }

    sockets()
    {
        this.io.on('connection', socketController );
    }

    listen(){
        this.server.listen( this.port, ()=>{
            console.log(`Server listening port ${ this.port }`)
        })
    }
}


module.exports = Server;
