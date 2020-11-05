
const db = require("../../database");

module.exports = {
    /**
        * Register a new order 
        * @param clientName
        * @param phone
        * @param city
        * @param distric
        * @param state
        * @param codeDelivery
        * @param amountPakages
        * @param totalDimensions
        * @param directionDetails
        * @param orderDescription
        * @param limitDate
        * @param userId
        * @returns {Promise<any>}
       */
    newOrder: (clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, payment, userId) => new Promise(
        (resolve, reject) => {
            db.query('INSERT INTO orders SET ?',
                { clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, payment, userId },
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
                            message: 'Orden registrada'
                        });
                    }
                }
            )

        }
    ),
    

    /**
     * Get all Orders data (admin role)
     * @returns {Promise<any>}
     */
    getOrders: () => new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT * FROM orders ORDER BY createdAt DESC', 
                [],
                (err, rows, fields) => {
                    if(err) return reject(err);
                    if(Array.isArray(rows) && rows.length >0) {
                        return  resolve(rows && Array.isArray(rows) ? rows : []);
                    } else {
                        return reject({
                            status: 400, 
                            message: 'No existen pedidos registrados'
                        });
                    } 
                }
            )
        }
    ),

     /**
     * Get user data by user id, date and order state
     * @param id
     * @param state
     * @param date
     * @return {Promise<any>}
     */

    getUserOrders: (userId,date, state) => new Promise(
        (resolve,reject) =>{
            if(date==='null' || state==='null') {
                db.query(
                    'SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC',
                    [userId], 
                    (err, rows, fields) =>{
                        if(err) return reject(err);
                        if(Array.isArray(rows) && rows.length >0) {
                            return  resolve(rows && Array.isArray(rows) ? rows : []);
                        } else {
                            return reject({
                                status: 400, 
                                message: 'No tiene pedidos registrados'
                            });
                        }
                    }
                )
            } //Condicion para mostrar todas las ordenes de un dia especificado 
            else if( state === 0 || date ) {
                db.query(
                    'SELECT * FROM orders WHERE userId = ? AND (createdAt >= ? AND createdAt < ? + INTERVAL 1 DAY) ORDER BY createdAt DESC',
                    [userId, date, date], 
                    (err, rows, fields) =>{
                        if(err) return reject(err);
                        if(Array.isArray(rows) && rows.length >0) {
                            return  resolve(rows && Array.isArray(rows) ? rows : []);
                        } else {
                            return reject({
                                status: 400, 
                                message: 'No tiene pedidos registrados'
                            });
                        }
                    }
                )
            } 
            else {
                db.query(
                    'SELECT * FROM orders WHERE userId = ? AND (createdAt >= ? AND createdAt < ? + INTERVAL 1 DAY) AND state = ? ORDER BY createdAt DESC',
                    [userId,date,date,state], 
                    (err, rows, fields) =>{
                        if(err) return reject(err);
                        if(Array.isArray(rows) && rows.length >0) {
                            return  resolve(rows && Array.isArray(rows) ? rows : []);
                        } else {
                            return reject({
                                status: 400, 
                                message: 'No tiene pedidos registrados'
                            });
                        }
                    }
                )
            }
        }
    ),

     /**
     * Get user data by user id, date and order state
     * @param id
     * @param codeDelivery
     * @return {Promise<any>}
     */

    getOrderById: (userId,codeDelivery) => new Promise(
        (resolve,reject) =>{
                db.query(
                    'SELECT * FROM orders WHERE userId = ? and codeDelivery= ?',
                    [userId, codeDelivery], 
                    (err, rows, fields) =>{
                        if(err) return reject(err);
                        if(Array.isArray(rows) && rows.length >0) {
                            return  resolve(rows && Array.isArray(rows) ? rows : []);
                        } else {
                            return reject({
                                status: 400, 
                                message: 'No tiene pedidos registrados'
                            });
                        }
                    }
                )
        }
    ),
      /**
     * Check if user exists on database and get his data
     * @param code
     * @param userId
     * @returns {Promise<any>}
     */
    checkCodeDeliveryInDatabase: (code, userId) => new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT codeDelivery FROM orders WHERE codeDelivery = ? AND userId = ?',
                [code, userId],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (Array.isArray(res) && res.length > 0) {
                        return resolve({
                            status: 200,
                            message: 'Code delivery registrado'
                        });
                    } else {
                        return reject({
                            status: 400,
                            message: 'Code delivery no registrado'
                        });
                    }
                }
            )
        }
    ),

    /**
     * Update order state
     * @param userId
     * @param orderId
     * @param newState
     * @param lastState
     * @returns {Promise<any>}
     */
    upGradeOrderSate: (userId, orderId, newState, lastState) => new Promise(
        (resolve, reject) => {
            db.query(
                'UPDATE orders SET state = ? WHERE userId = ? AND id = ?'
                [newState, userId, orderId],
                (err, res) => {
                    if(err) {
                        return reject({
                            status: 405,
                            message: 'Error al actualizar el estado, intente nuevamente'
                        });
                    } else {
                        return resolve ({
                            status: 200, 
                            message: 'Estado del pedido actualizado'
                        })
                    }
                }
            ),
            db.query(
                'INSERT INTO upgradeOrderState SET ?',
                {orderId, lastState, newState},
                (err,res) => {
                    if(err) {
                        return reject({
                            status: 405,
                            message: 'Error al actualizar el estado, intente nuevamente'
                        });
                    } else {
                        return resolve ({
                            status: 200, 
                            message: 'Estado del pedido actualizado'
                        })
                    }
                }
            )
        }
    )

}