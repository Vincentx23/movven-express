
const db = require("../../database");

module.exports = {


    /**
     * Get business data 
     * @returns {Promise<any>}
     */
       getBusiness: () => new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT * FROM business',
                [],
                (err, rows, fields) =>{
                    if(err) return reject(err);
                    if(Array.isArray(rows) && rows.length >0) {
                        return  resolve(rows && Array.isArray(rows) ? rows : []);
                    } else {
                        return reject({
                            status: 400, 
                            message: 'No tiene empresas registradas'
                        });
                    }
                }
            )
        }
    ),

    /**
     * Register a new business 
     * @param name
     * @param description
     * @param code
     * @returns {Promise<any>}
    */
     newBusiness: (name, description, code) => new Promise(
        (resolve, reject) => {
            db.query('INSERT INTO business SET ?',
                { name: name, description: description, code: code },
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject({
                            status: 404,
                            message: 'Error al registrar, intente nuevamente'
                        });
                    } else {
                        return resolve({
                            status: 200,
                            message: 'Empresa registrada'
                        });
                    }
                }
            )

        }
    ),


    /**
     * Get Business data by id
     * @param id
     * @return {Promise<any>}
     */
     getBusinessById: id => new Promise(
         (resolve,reject) =>{
             db.query(
                 'SELECT * FROM business WHERE id = ?',
                 [id], 
                 (err, rows, fields) =>{
                     if(err) return reject(err);
                     if(Array.isArray(rows) && rows.length >0) {
                         return resolve(rows[0])
                     } else {
                         return reject({
                             status: 404, 
                             message: 'Empresa no encontrada'
                         });
                     }
                 }
             )
         }
     ),

       
    /**
     * Check if business exists on database and send the verification
     * @param code
     * @returns {Promise<any>}
     */
    checkBusinessCodeInDatabase: (code) => new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT * FROM business WHERE code = ?',
                [code],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (Array.isArray(res) && res.length > 0) {
                        return resolve({
                            status: 200,
                            message: 'Empresa encontrada',
                            data: res[0]
                        });
                    } else {
                        return reject({
                            status: 400,
                            message: 'Empresa no encontrada'
                        });
                    }
                }
            )
        }
    ),

    
    /**
     * Function to asing business to a user
     * @param userId
     * @param businessId
     * @return {Promise<any>}
     */
    asingBusinessToUser: (userId, businessId) => new Promise(
        (resolve, reject) => {
            db.query(
                'UPDATE users SET businessId = ? WHERE id = ?',
                [businessId, userId],
                (err, res) => {
                    if(err) {
                        return reject({
                            status: 400,
                            message: 'Error al asignar empresa'
                        });
                    } else {
                        return resolve ({
                            status: 200, 
                            message: 'Empresa asignada'
                        })
                    }
                }
            )
        }
    ),

    
     
}


