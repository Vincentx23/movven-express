const controller = {}

const {getUsers} = require('../services/users')

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

module.exports = controller