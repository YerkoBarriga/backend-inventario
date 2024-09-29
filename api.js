import express from 'express';
import inventarioRoutes from './routes/inventario.js';
import categoriaRoutes from './routes/categoria.js';
import piezaRoutes from './routes/pieza.js';

const api=express();
api.use(express.json());
const port =3000;
// Usamos el grupo de rutas en "/inventario"
api.use('/inventario', inventarioRoutes);
api.use('/inventario', categoriaRoutes);
api.use('/inventario', piezaRoutes);

api.listen(port, ()=>{
    console.log( `servidor levantado en el puerto - ${port}` );
})

