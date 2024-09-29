import express from 'express'
import db from "../database.js";

const router = express.Router();



// obtener los provedores
router.get('/provedores', async(req, res)=>{
    try {
        const prove= await db('provedores');
        res.json({
            prove
        })
    } catch (error) {
        console.error('Error ak obtner provedores', error);
        res.status(500).json({error:'Error al obtener provedores'});
    }
});
//guardar provedores
router.post('/provedores', async(req, res)=>{
    try {
        //desestruracion de datos
        const {nombre,direccion,ciudad,provincia}=req.body;
        //valido datos
        //!nommbre    verificacion de valores vacios  o falsy - tipo de valor falsy-- verificamos si es un tipo de valor falsy que son vacion , nulos ,undefned, 0 ,'', NaN
        if (!nombre || !direccion|| !ciudad || !provincia) {
            res.status(400).json({error:'falta el campo nombre'})
        }
        const nuevo_provedor={
            nombre,
            direccion,
            ciudad,
            provincia
        }
        const inser_pro= await db('provedores').insert(nuevo_provedor).returning('*');
        res.status(201).json({
            msg: 'Proveedor registrado exitosamente',
            proveedor: inser_pro
        });
    } catch (error) {
        console.error('Error al registrar el proveedor:', error);
        res.status(500).json({ error: 'Error al registrar el proveedor' });
    }
});
//obtener provedores por ID
router.get('/provedores/:id', async(req, res)=>{
    try {
        /*
        esto tambien podria ser de esta manera 
        const id_prove = req.params;
        pero .-.> deberia crear en la linea de abajo 
        const dato= id_prove.id
        y despues pasar dato a la consulta.
        */
        const {id}=req.params;
        console.log('hola');
        const obt = await db('provedores').where({'id_provedor':id});
        if (!obt) {
            return res.status(404).json({
                error:'falta el campo nombre'
            });
        }
        res.json({
            provedor: obt
        });
    } catch (error) {
        console.error('Error al registrar el proveedor:', error);
        res.status(500).json({ error: 'Error al obtener al provedor' });
    }
});

//actualizar provedores
router.put('/provedores/:id', async(req, res)=>{
    try {
        const {id}= req.params;
        const {nombre, direccion, ciudad, provincia}= req.body;
        if(!nombre|| !direccion || !ciudad || !provincia ){
            return res.status(400).json({
                error: 'campos faltantes'
            })
        }
        const datos_provedor={
            nombre,
            direccion,
            ciudad,
            provincia
        }
        const id_obt= await db('provedores')
        .where({'id_provedor': id})
        .update(datos_provedor);

        if (!id_obt) {
            return res.status(404).json({
                error:'provedor no encontrado'
            })
        }
        res.json({
            msg:'provedor actualiazado'
        })
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).json({ error: 'Error al actualizar el proveedor' });
    }
});

// elimiar provedor

router.delete('/provedores/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        const prove=await db ('provedores')
        .where({'id_provedor':id})
        .del();

        if (!prove) {
            return res.status(404).json({
                error: 'provedor no encontrado'
            })
        }
        res.status(204).json({
            msg: `provedor con id ${id} eliminado con éxito`,
        })

    } catch (error) {
        
    }
});
export default router;