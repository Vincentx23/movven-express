const db = require("../../database");


module.exports = {
   /**
     * Get user data by id
     * @param id
     * @return {Promise<any>}
     */
    getUsers: (id) => new Promise(
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
}