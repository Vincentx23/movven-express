const controller = {};

const {newOrder, getUserOrders} = require('../services/orders');

/**Function to generate a random code */
function ramdomCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

controller.newOrder = async (req,res,next) => {
    try{
        const {clientName, phone, city, distric, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate} = req.body; 

        if(!clientName || !phone || !city || !distric || !amountPakages || !totalDimensions || !directionDetails || !orderDescription || !limitDate) {
            return res.status(400).json({ message: "Ingrese todos los campos requeridos" }) 
        }

        newOrder(clientName, phone, city, distric, 1, ramdomCode(10), amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, req.userId);
        res.status(200).json({message: 'Pedido registrado'});

    }catch(err) {
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}

controller.getUserOrders = async (req,res, next) => {
    try {
        const orders = await getUserOrders(req.userId);
        if(!orders) {
            return res.status(404).send('No tiene ordenes registradas');
        }
        return res.status(200).send({data: orders})
    }catch(err) { 
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}


module.exports = controller