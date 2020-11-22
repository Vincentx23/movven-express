const db = require("../../database");


module.exports = {
   /**
     * Get user data by id
     * @return {Promise<any>}
     */
    getUsers: () => new Promise(
        (resolve,reject) =>{
            db.query(
                'SELECT * FROM users order by userType',
                [], 
                (err, rows, fields) =>{
                    if(err) return reject(err);
                    if(Array.isArray(rows) && rows.length >0) {
                        return  resolve(rows && Array.isArray(rows) ? rows : []);
                    } else {
                        return reject({
                            status: 400, 
                            message: 'No tiene usuarios registrados'
                        });
                    }
                }
            )
        }
    ),


    /**
     * Get users in role 2 (conductor)
     * @return {Promise<any>}
     */
    getConductors: () => new Promise(
        (resolve,reject) =>{
            db.query(
                'SELECT name, email, userType, con.id as "conductorId", us.id, con.orderId FROM users us INNER JOIN conductor con ON us.id = con.userId WHERE userType = 2',
                //'SELECT name, email, userType, id FROM users WHERE userType = 2',
                [], 
                (err, rows, fields) =>{
                    if(err) return reject(err);
                    if(Array.isArray(rows) && rows.length >0) {
                        return  resolve(rows && Array.isArray(rows) ? rows : []);
                    } else {
                        return reject({
                            status: 400, 
                            message: 'No tiene usuarios registrados'
                        });
                    }
                }
            )
        }
    ),


    /**
     * Check conductors asignet to a order by conductor id
     * @param orderId
     * @returns {Promise<any>}
     */
    checkCoductorAsignedOrder: (orderId) =>new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT * FROM conductor where orderId = ?',
                [orderId],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (Array.isArray(res) && res.length > 0) {
                        return resolve({
                            status: 200,
                            message: 'Conductor registrado'
                        });
                    } else {
                        return reject({
                            status: 400,
                            message: 'Conductor no registrado'
                        });
                    }
                }
            )
        }  
    ),

    /**
     * Asing conductor to a order 
     * @param orderId
     * @param conductorId
     * @returns {Promise<any}
     */
    asingConductorOrder: (orderId, userId) => new Promise(
        (resolve, reject) => {
            db.query(
                'INSERT INTO conductor SET ?',
                {orderId, userId },
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject({
                            status: 400,
                            message: 'Error al asignar conductor, intente nuevamente'
                        });
                    } else {
                        return resolve({
                            status: 200,
                            message: 'Conductor asignado'
                        });
                    }
                }
            )
        }
    ),


    /**
     * Update conductor to a order
     * @param orderId
     * @param userId
     * @returns {Promise<any>}
     */
    upGradeConductorOrder: (userId, orderId) => new Promise(
        (resolve, reject) => {
            db.query(
                'UPDATE conductor SET userId = ? WHERE orderId = ?',
                [userId, orderId],
                (err, res) => {
                    if(err) {
                        return reject({
                            status: 400,
                            message: err
                        });
                    } else {
                        return resolve ({
                            status: 200, 
                            message: 'Conductor del pedido actualizado'
                        })
                    }
                }
            )
        }
    )




}