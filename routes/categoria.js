import express from 'express';
import db  from'../database.js';
const router = express.Router();


//obtener todas las categorais
router.get('/categorias' , async (req, res)=>{
    try {
        const cate = await db('categorias');
        res.json({
          cate
        })
    } catch (error) {
        console.error('Error al obtener proveedores:', error); // Registrar error
        res.status(500).json({ error: 'Error al obtener proveedores' }); // Responder con error 500
    }
});

//guardar provedores
router.post('/categorias', async(req, res)=>{
    try {
        //desestruracion de datos
        const {nombre,detalle}=req.body;
        //valido datos
        //!nommbre    verificacion de valores vacios  o falsy - tipo de valor falsy-- verificamos si es un tipo de valor falsy que son vacion , nulos ,undefned, 0 ,'', NaN
        if (!nombre || !detalle) {
            res.status(400).json({error:'falta el campo nombre'})
        }
        const nuevo_categoria={
            nombre,
            detalle
        }
        const inser_cate= await db('categorias').insert(nuevo_categoria).returning('*');
        res.status(201).json({
            msg: 'categoria registrado exitosamente',
            proveedor: inser_cate
        });
    } catch (error) {
        console.error('Error al registrar el proveedor:', error);
        res.status(500).json({ error: 'Error al registrar la categoria' });
    }
});
//obtener categoria por ID
router.get('/categorias/:id', async(req, res)=>{
    try {
        /*
        esto tambien podria ser de esta manera 
        const id_prove = req.params;
        pero .-.> deberia crear en la linea de abajo 
        const dato= id_prove.id
        y despues pasar dato a la consulta.
        */
        const {id}=req.params;
        const obt = await db('categorias').where({'id_categoria':id});
        if (!obt) {
            return res.status(404).json({
                error:'falta el campo nombre'
            });
        }
        res.json({
            cate: obt
        });
    } catch (error) {
        console.error('Error al registrar el proveedor:', error);
        res.status(500).json({ error: 'Error al obtener la categoria' });
    }
});
//actualizar cagegorias
router.put('/categorias/:id', async(req, res)=>{
    try {
        const {id}= req.params;
        const {nombre, detalle}= req.body;
        if(!nombre|| !detalle ){
            return res.status(400).json({
                error: 'campos faltantes'
            })
        }
        const datos_categoria={
            nombre,
            detalle
        }
        const id_obt= await db('categorias')
        .where({'id_categoria': id})
        .update(datos_categoria);

        if (!id_obt) {
            return res.status(404).json({
                error:'categoria no encontrado'
            })
        }
        res.json({
            msg:'categoria actualiazado'
        })
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        res.status(500).json({ error: 'Error al actualizar la categoria' });
    }
});
// elimiar ccategoria

router.delete('/categorias/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const cate=await db ('categorias')
        .where({'id_categoria':id})
        .del();

        if (!cate) {
            return res.status(404).json({
                error: 'categoria no encontrada'
            })
        }
        res.status(204).json({
            msg: `categoria con id ${id} eliminado con éxito`,
        })

    } catch (error) {
        
    }
});

export default router;