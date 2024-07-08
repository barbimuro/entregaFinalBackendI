import  express  from "express";
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routes/views.router.js'
import mongoose from 'mongoose';

const app = express()

const PORT = process.env.PORT || 8080 ;

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))

app.use(express.json());
app.use(express.static('./src/public'))
app.use(express.urlencoded({extended:true}))

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://barbimuro:123@cluster.mcha7rj.mongodb.net/TypesOfProducts?retryWrites=true&w=majority&appName=Cluster');
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  
  connectDB();

app.use('/products',viewsRouter);

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const socketServer = new Server(server);
socketServer.on('connection',(socketClient) => {
    console.log("Cliente Conectado");
    socketServer.emit('productAdded');

    socketClient.on('addProduct', data =>{
        console.log(`Se agrego el producto con el id ${data}`);
        socketServer.emit('productAdded');
    })
});