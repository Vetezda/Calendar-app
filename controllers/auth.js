const { request, response } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');

const crearUsuario = async( req= request, res = response ) => {
    const { name, email, password } = req.body;
    
    try {
        const usuario = new Usuario( req.body);

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );
    
        await usuario.save();

        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status(201).json({
            ok : true, 
            msg: 'Usuario creado',
            uid: usuario.uid,
            name: usuario.name,
            token
        });    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false, 
            msg: 'Por favor hable con el administrador',
        });    
        
    }
    
}

const loginUsuario = async( req= request, res = response ) => {
    
    const { email, password } = req.body;
    
    try {
        
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                ok : false, 
                msg: 'El usuario con ese email no existe '
            });
        }
        console.log({ email, password });
        console.log(usuario.password);
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok : false, 
                msg: 'El password no es correcto'
            });
        }
        
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.json({
            ok : true, 
            msg: 'Usuario logeado',
            uid: usuario.uid,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const revalidarToken = async( req= request, res = response ) => {
    
    const { uid, name } = req;
    
    const token = await generarJWT( uid, name );


    res.json({
        ok : true,
        uid, 
        name, 
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}