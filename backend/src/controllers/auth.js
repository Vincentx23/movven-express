const controller = {};

const {checkUserInDatabase, newUser, getUserById}= require('../services/auth')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtConfig = require('../config/jwt')


controller.register = async (req, res, next) => {
    const {name, email, password, passwordCheck} = req.body
    const correo = email.toLowerCase();

    try{

        if(!name || !correo || !password || !passwordCheck) {
            return res.status(400).json({message: "Campos obligatorios no llenados"})
        }

        if(password.length < 5) {
            return res.status(400).json({message: "La contraseña debe ser de 5 caracteres minimo"})
        }

        if(password !== passwordCheck) { 
            return res.status(400).json({message: "Las contraseñas no coinciden"});
        }

       const checkuser =  await checkUserInDatabase(correo); 

       if(checkuser) {
           return res.status(400).json({message: "Usuario registrado, intente nuevamente"})
       }

    }catch(err){

        const salt = bcrypt.genSaltSync(10);
        let hashedPass = bcrypt.hashSync(password, salt);
        
        newUser(name, correo, hashedPass);
        res.status(200).json({message: 'Usuario registrado'});
    }
}

controller.login = async (req,res,next) => {
    try{
        const {email, password}  = req.body; 
        const correo = email.toLowerCase()

        if(!correo || !password) {
            return res.status(400).json({message:"Campos vacios."});
        }

        const user = await checkUserInDatabase(correo)

        if(user) {
            const validPassword =  bcrypt.compareSync(password, user.password)
            
            if(!validPassword) {
                return res.status(401).json({auth: false, token: null, message: "Correo o Contraseña incorrectos"});
            } else  {
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET || jwtConfig.secret, {
                    expiresIn: 60 * 60 * 24
                });

                res.json({
                    auth: true, 
                    token,
                    user: {
                        id: user.id,
                        nombre: user.name, 
                        email: user.email
                    }
                });
            }
        }
    }catch(err) {
        res.status(401).json({
            auth: false, 
            token: null,
            message: 'Correo o Contraseña incorrectos'
        });  
    }
}

controller.me = async (req,res, next) => {
    try {
        const user = await getUserById(req.userId);
        if(!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(user)
    }catch(err) { 
        res.status(500).json({error: err.message});
    }
}


controller.tokenIsValid = async (req, res, next) => { 
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.json(false);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || jwtConfig.secret);

        if(!decoded) {
            return res.json(false);
        }

        const user = await getUserById(decoded.id);

        if(!user) {
            return res.json(false);
        }

        return res.json(true);

    }catch(err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = controller