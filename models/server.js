const cors = require('cors')
const express = require('express');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;     

        //MONGOOSE
        this.connectDB()

        //MIDDLEWARES
        this.middlewares();

        //ROUTES
        this.routes();
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
        this.app.use( '/api/auth', require('../routes/auth') );
        this.app.use('/api/users',require('../routes/users'));

    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log(`Server listening port ${ this.port }`)
        })
    }
}


module.exports = Server;
