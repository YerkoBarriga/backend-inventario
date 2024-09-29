import express from 'express';
import db  from'../database.js';
const router = express.Router();

//listar todos las piezas
router.get('/piezas', async(req, res)=>{
    try {
        const piezas = await db ('piezas');
        res.status(200).json({
            piezas
        })
    } catch (error) {
        console.error('Error al obtener piezas:', error); // Registrar error
        res.status(500).json({ error: 'Error al obtener piezas' }); // Responder con error 500
    }
});

//obtener todas las categorais
router.get('/piezas/:id' , async (req, res)=>{
    try {
        const {id}=req.params;
        const pieza = await db('piezas as p')
        .join('categorias as c', 'p.id_categoria','c.id_categoria')
        .select(
            'p.nombre as nombre_pieza',
            'p.precio',
            'c.id_categoria',
            'c.nombre as nombre_categoria'
        )
        .where({'id_pieza':id});
        if (!pieza) {
            return res.status(404).json({
                error:'pieza no encontrada'
            })
        }

        res.json({
          pieza
        })
    } catch (error) {
        console.error('Error al obtener la pieza:', error); // Registrar error
        res.status(500).json({ error: 'Error al obtener la pieza' }); // Responder con error 500
    }
});
//guardar 
router.post('/piezas', async(req, res)=>{
    try {
        const {id_categoria, nombre, precio}=req.body;
        if (!id_categoria|| !nombre|| !precio) {
            return res.status(404).json({
                error:' hay campos faltantes'
            })
        }

        const datos={
            id_categoria,
            nombre,
            precio
        }

        const guadar= await  db ('piezas').insert(datos).returning('*');
        res.status(201).json({
            msg: 'pieza registrado exitosamente',
            proveedor: guadar
        });

    } catch (error) {
        console.error('Error al registrar la pieza:', error);
        res.status(500).json({ error: 'Error al registrar la pieza' });
    }
});
//actualizar cagegorias
router.put('/piezas/:id', async(req, res)=>{
    try {
        const {id}= req.params;
        const {id_categoria,nombre, precio}= req.body;
        if(!id_categoria || !nombre || !precio ){
            return res.status(400).json({
                error: 'campos faltantes'
            })
        }
        const datos_pieza={
            id_categoria,
            nombre,
            precio
        }
        const id_obt= await db('piezas')
        .where({'id_pieza': id})
        .update(datos_pieza);

        if (!id_obt) {
            return res.status(404).json({
                error:'pieza no encontrado'
            })
        }
        res.json({
            msg:'pieza actualiazado'
        })
    } catch (error) {
        console.error('Error al actualizar la peiza:', error);
        res.status(500).json({ error: 'Error al actualizar la pieza' });
    }
});
///eliminar

router.delete('/piezas/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const cate=await db ('piezas')
        .where({'id_pieza':id})
        .del();

        if (!cate) {
            return res.status(404).json({
                error: 'pieza no encontrada'
            })
        }
        res.status(204).json({
            msg: `pieza con id ${id} eliminado con éxito`,
        })

    } catch (error) {
        
    }
});
export default router;