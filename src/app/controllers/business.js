const controller = {};
const {
    getBusiness, newBusiness,
    getBusinessById, checkBusinessCodeInDatabase, asingBusinessToUser
} = require('../services/business');

const utils = require('../utils/randomCode');

controller.getBusiness = async (req, res, next) => {
    try {
        let business = await getBusiness();
        if (!business) {
            return res.status(404).send('No tiene empresas registradas');
        }
        return res.status(200).send({ error: null, data: business })
    } catch (err) {
        res.status(err.status ? err.status : 500).send({ error: err.message });
    }
}


controller.newBusiness = async (req, res, next) => {
    const {businessName, businessDescription} = req.body;
    var randomCode = '';
    try {
        
        if(!businessName || !businessDescription){
            return res.status(400).json({ message: "Ingrese todos los campos requeridos" }) 
        }
        
        //We generate the random code
        randomCode = utils.generateRandomString();

        //We check if th code exist
        const checkBusinessCode = await checkBusinessCodeInDatabase(randomCode);

        //While the random code exist we generate and verify again
        while(checkBusinessCode){
            randomCode= utils.generateRandomString();
            checkBusinessCode = await checkBusinessCodeInDatabase(randomCode);
        }

    } catch (err) {
         //Si capta un error de la peticion del servicio de verificacion de code, significa que el codigo no existe, por tanto dejamos registrar la peticion
         newBusiness(businessName, businessDescription, randomCode);
         res.status(200).json({message: 'Pedido registrado'});

    }
}

controller.asingBusiness = async (req,res,next) => {
    try{
        const {userId, businessId} = req.body; 
        
        await asingBusinessToUser(userId, businessId);
        res.status(200).send({message:'Usuario actualizado'});

    }catch(err){
        res.status(err.status ? err.status : 500).send({ error: err.message });

    }
}



module.exports = controller;