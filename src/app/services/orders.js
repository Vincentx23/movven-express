
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
    newOrder: (clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, payment, createdAt, userId)  => new Promise(
        (resolve, reject) => {      
            db.query('INSERT INTO orders SET ?',
                { clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, payment, createdAt, userId },
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
    getOrders: (state,date) => new Promise(
        (resolve, reject) => {
            if(state === 'null' && date === 'null') {
                db.query(
                    'SELECT ord.id, createdAt, clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails,orderDescription, limitDate, payment, userId, name, email FROM orders ord INNER JOIN users us ON ord.userId = us.id ORDER BY createdAt DESC', 
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
            }else if( state === 0 && date) {
                db.query(
                    'SELECT ord.id, createdAt, clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails,orderDescription, limitDate, payment, userId, name, email  FROM orders ord INNER JOIN users us ON ord.userId = us.id WHERE (createdAt >= ? AND createdAt < ? + INTERVAL 1 DAY) ORDER BY createdAt DESC',
                    [date, date], 
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
            } else if (state > 0 && date === 'null') {
                db.query(
                    'SELECT ord.id, createdAt, clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails,orderDescription, limitDate, payment, userId, name, email  FROM orders ord INNER JOIN users us ON ord.userId = us.id WHERE state = ?  ORDER BY createdAt DESC',
                    [state], 
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
            } else {
                db.query(
                    'SELECT ord.id, createdAt, clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails,orderDescription, limitDate, payment, userId, name, email  FROM orders ord INNER JOIN users us ON ord.userId = us.id WHERE (createdAt >= ? AND createdAt < ? + INTERVAL 1 DAY) AND state = ? ORDER BY createdAt DESC',
                    [date,date,state], 
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
     * Get user data by user id, date and order state (client role)
     * @param id
     * @param state
     * @param date
     * @return {Promise<any>}
     */

    getUserOrders: (userId,date, state) => new Promise(
        (resolve,reject) =>{
            if(date==='null'  && state==='null') {
                db.query(
                    'SELECT * FROM orders WHERE userId = ? ORDER BY  `createdAt` DESC',
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
            else if( state === 0 && date ) {
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
            } else if (state && date === 'null'){
                db.query(
                    'SELECT * FROM orders WHERE userId = ? AND state = ?  ORDER BY createdAt DESC',
                    [userId, state], 
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
     * Get order data by idOrder 
     * @param idOrder
     * @return {Promise<any>}
     */

    getOrderById: (idOrder) => new Promise(
        (resolve,reject) =>{
                db.query(
                    'SELECT ord.id, createdAt, clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails,orderDescription, limitDate, payment, userId, name, email  FROM orders ord INNER JOIN users us ON ord.userId = us.id WHERE ord.id = ? ORDER BY createdAt DESC ',
                    [idOrder], 
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
     * Get order data by idOrder (admin role)
     * @param idOrder
     * @returns {Promise<any>}
     */
    getAdminOrdersById: (idOrder) => new Promise(
        (resolve,reject) =>{
                db.query(
                    'CALL getAdminOrderDetails (?)',
                    [idOrder], 
                    (err, rows, fields) =>{
                        if(err) return reject(err);
                        if(Array.isArray(rows) && rows.length >0) {
                            return  resolve(rows && Array.isArray(rows) ? rows[0] : []);
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
     * Get conductors orders data (conductor role)
     * @param idUser
     * @returns {Promise<any>}
     */
    getConductorOrders: (idUser) => new Promise( 
        (resolve, reject) => {
            db.query(
                'SELECT createdAt, clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, payment, orderId FROM orders ord INNER JOIN conductor cd ON ord.id = cd.orderId WHERE cd.userId = ?',
                [idUser],
                (err, rows, fields) =>{
                    if(err) return reject(err);
                    if(Array.isArray(rows) && rows.length >0) {
                        return  resolve(rows && Array.isArray(rows) ? rows : []);
                    } else {
                        return reject({
                            status: 400, 
                            message: 'No tiene pedidos asignados'
                        });
                    }
                }
            )
        }
    ),

    /**
     * Get Orders State by idOrder (admin role)
     * @param idOrder
     * @returns {Promise<any>}
     */
    getOrderStateById: (idOrder) => new Promise(
        (resolve,reject) =>{
            db.query(     
                'SELECT Time(updateDate) as hora, date_format(updateDate, "%Y/%m/%d") as fecha, lastState, newState FROM upgradeOrderState where orderId = ?',
                [idOrder], 
                (err, rows, fields) =>{
                    if(err) return reject(err);
                    if(Array.isArray(rows) && rows.length >0) {
                        return  resolve(rows && Array.isArray(rows) ? rows : []);
                    } else {
                        return reject({
                            status: 400, 
                            message: 'No tiene estados registrados'
                        });
                    }
                }
            )
        }
    ),
  
    
    /**
     * Check if order exists on database and get its data
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
     * @param updateDate
     * @returns {Promise<any>}
     */
    upGradeOrderSate: ( orderId, updateDate, newState) => new Promise(
        (resolve, reject) => {
            db.query(
                'UPDATE orders SET state = ? WHERE id = ?',
                [newState, orderId],
                (err, res) => {
                    if(err) {
                        return reject({
                            status: 400,
                            message: err
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
                'INSERT INTO upgradeOrderState (orderId, updateDate,newState) VALUES(?,?,?)',
                [orderId, updateDate,newState],
                (err,res) => {
                    if(err) {
                        return reject({
                            status: 400,
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