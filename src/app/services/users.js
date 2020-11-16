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
                'SELECT * FROM users WHERE userType = 2',
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
    )
}