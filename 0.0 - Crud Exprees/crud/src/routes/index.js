const express = require('express');
const router = express.Router();
const pool = require('../database');

//vista listar
router.get('/', async (req, res) => {
	const datos = await pool.query('SELECT * FROM datos');
	res.render('registros/listar', { datos });
});

//vista agregar
router.get('/agregar', async (req, res) => {
	res.render('registros/agregar');
});

//agregar nuevo
router.post('/agregar', async (req, res) => {
	const { nombre, edad, correo, direccion } = req.body;
	const nuevo = { nombre, edad, correo, direccion };
	await pool.query('insert into datos set ?', [nuevo]);
	res.redirect('/');
	
});

//vista modificar
router.get('/modificar/:id', async (req, res) => {
	const {id} = req.params;
	const datos = await pool.query('SELECT * FROM datos WHERE id_datos =?',[id]);
	res.render('registros/modificar', {dato: datos[0]});
});

//modificar datos
router.post('/modificar/:id', async(req,res) => {
	const {id} = req.params;
	const { nombre, edad, correo, direccion } = req.body;
	const datos = { nombre, edad, correo, direccion };
	const usua =await pool.query('UPDATE datos set ? WHERE id_datos = ?', [datos, id]);
	res.redirect('/');
});
 
//eliminar uno
router.get('/eliminar/:id', async(req,res) => {
    const {id} = req.params;
    await pool.query('delete from datos where id_datos=?',[id]);
    res.redirect('/');
});

module.exports = router;