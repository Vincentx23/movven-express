const controller = {};

const {newOrder, getUserOrders, checkCodeDeliveryInDatabase, 
    upGradeOrderSate, getOrderById, getOrders, 
    getAdminOrdersById, getOrderStateById, getConductorOrders} = require('../services/orders');
    const dbUtils = require('../utils/db');


controller.newOrder = async (req,res,next) => {
    const {clientName, phone, city, distric, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, codeDelivery, payment} = req.body; 
    const createdAt = await dbUtils.actualDate()

    try{
        if(!clientName || !phone || !city || !distric || !amountPakages || !totalDimensions || !directionDetails || !orderDescription || !limitDate || !codeDelivery) {
            return res.status(400).json({ message: "Ingrese todos los campos requeridos" }) 
        }

        const checkCodeDelivery = await checkCodeDeliveryInDatabase(codeDelivery, req.userId)
        //Si existe lanza un error     
        if(checkCodeDelivery) {
            return res.status(400).send({error: "Code delivery registrado, ingrese uno nuevo"}) 
        }
        
    }catch(err) {
        //Si capta un error de la peticion del servicio de verificacion de code, significa que el codigo no existe, por tanto dejamos registrar la peticion
        newOrder(clientName, phone, city, distric, 1, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, payment, createdAt[0].date, req.userId);
        res.status(200).json({message: 'Pedido registrado'});
    }
}


controller.getOrders = async (req,res, next) => {
    try {
        let state = req.params.state;
        let date = req.params.date;
        let orders = await getOrders(state, date);
        if(!orders) {
            return res.status(404).send('No tiene ordenes registradas');
        }
        return res.status(200).send({data: orders})
    }catch(err) { 
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}

controller.getUserOrders = async (req,res, next) => {
    try {
        let state = req.params.state;
        let date = req.params.date;
         
        let orders = await getUserOrders(req.userId,date,state);

        if(!orders) {
            return res.status(404).send('No tiene ordenes registradas');
        }

        return res.status(200).send({data: orders})
    }catch(err) { 
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}

controller.getOrderById = async(req,res,next) => {
    try{

        let orderId = req.params.id;

        const order = await getOrderById(orderId)

        if(!order) {
            return res.status(404).send('Detalles no disponibles');  
        }
        return res.status(200).send({data: order})

    }catch(err){
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}


controller.getAdminOrdersById = async(req,res,next) => {
    try{

        let orderId = req.params.id;

        const order = await getAdminOrdersById(orderId)

        if(!order) {
            return res.status(404).send('Detalles no disponibles');  
        }
        return res.status(200).send({data: order})

    }catch(err){
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}

controller.getConductorOrders = async(req,res,next) => {
    try{
        const order = await getConductorOrders(req.userId)

        if(!order) {
            return res.status(404).send('No tiene ordenes asignadas');  
        }
        return res.status(200).send({data: order})

    }catch(err){
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}

controller.getOrderStateById = async(req,res,next) => {
    try{

        let orderId = req.params.id;

        const order = await getOrderStateById(orderId)

        if(!order) {
            return res.status(404).send('Detalles no disponibles');  
        }
        return res.status(200).send({data: order})

    }catch(err){
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}


controller.upGradeOrderState = async(req, res, next) => {
    const {newState,  orderId} = req.body;
    const updateDate = await dbUtils.actualDate()
    try{

        if(!newState){
            return res.status(400).send({ message: "Ingrese todos los campos requeridos" }) 
   
        }

        await upGradeOrderSate(orderId,updateDate[0].date, newState);
        res.status(200).send({message:'Estado del pedido actualizado'});
        
    }catch(err) {
        res.status(err.status ? err.status : 500).send({error: err.message});  
    }
}

module.exports = controller