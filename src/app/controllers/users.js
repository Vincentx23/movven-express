const controller = {}

const {getUsers,getConductors,asingConductorOrder, checkCoductorAsignedOrder, upGradeConductorOrder} = require('../services/users')

controller.getUsers = async (req,res,next) => {
        try {
            let users = await getUsers();
            if(!users) {
                return res.status(404).send('No tiene ordenes registradas');
            }
            return res.status(200).send({error:null,data: users})
        }catch(err) { 
            res.status(err.status ? err.status : 500).send({error: err.message});  
        }
}

controller.getUsersByRole= async (req,res,next) => {
    try {
        let users = await getConductors();
        if(!users) {
            return res.status(404).send('No tiene ordenes registradas');
        }
        return res.status(200).send({data: users})
    }catch(err) { 
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}


controller.asingConductorOrder = async (req,res, next) => {
    const {orderId, userId} = req.body; 
    try{

        if(userId=== null){
            return res.status(400).json({ message: "Seleccione un conductor" }) 
        }

        let checkConductor = await checkCoductorAsignedOrder(orderId)
       
        //Si existe conductor asignado a la orden, dejamos actualizar el conductor de la orden
        if(checkConductor) {
           
            await upGradeConductorOrder(userId, orderId) 
           
        }
        return res.status(200).json({ message: "Conductor actualizado" }) 
    }catch(err) {
 
        //Si capta un error de la peticion del servicio de verificacion de conductor, significa que la orden no tiene conductor, por tanto dejamos registrar el conductor y lo asociamos con la orden
        await asingConductorOrder(orderId, userId)
        res.status(200).json({message: 'Conductor registrado'});
    }
}

module.exports = controller