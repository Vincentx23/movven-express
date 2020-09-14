
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
    newOrder: (clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, userId) => new Promise(
        (resolve, reject) => {
            db.query('INSERT INTO orders SET ?',
                { clientName, phone, city, distric, state, codeDelivery, amountPakages, totalDimensions, directionDetails, orderDescription, limitDate, userId },
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
     * Get user data by id
     * @param id
     * @return {Promise<any>}
     */

    getUserOrders: id => new Promise(
        (resolve,reject) =>{
            db.query(
                'SELECT * FROM orders WHERE userId = ?',
                [id], 
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

}