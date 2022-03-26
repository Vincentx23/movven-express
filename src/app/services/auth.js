
const db = require("../../database");

module.exports = {



    /**
     * Check if business exists on database and send the verification
     * @param code
     * @returns {Promise<any>}
     */
     checkUserCodeInDatabase: (code) => new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT id, codeUser FROM users WHERE codeUser = ?',
                [code],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (Array.isArray(res) && res.length > 0) {
                        return resolve({
                            status: 200,
                            message: 'Usuario encontrada',
                            data: res[0]

                        });
                    } else {
                        return reject({
                            status: 400,
                            message: 'Usuario no encontrada',
                        });
                    }
                }
            )
        }
    ),

    /**
     * Check if user exists on database and get his data
     * @param email
     * @returns {Promise<any>}
     */
    checkUserInDatabase: email => new Promise(
        (resolve, reject) => {
            db.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (Array.isArray(res) && res.length > 0) {
                        return resolve(res[0]);
                    } else {
                        return reject({
                            status: 400,
                            message: 'Correo o contraseña incorrectos'
                        });
                    }
                }
            )
        }
    ),

    /**
     * Register a new user 
     * @param name
     * @param email
     * @param password
     * @param code
     * @returns {Promise<any>}
    */
    newUser: (name, email, password, rol, codeUser) => new Promise(
        (resolve, reject) => {
            db.query('INSERT INTO users SET ?',
                { name: name, email: email, password: password, userType: rol, codeUser: codeUser  },
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
                            message: 'Usuario registrado'
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
     getUserById: id => new Promise(
         (resolve,reject) =>{
             db.query(
                 'SELECT * FROM users WHERE id = ?',
                 [id], 
                 (err, rows, fields) =>{
                     if(err) return reject(err);
                     if(Array.isArray(rows) && rows.length >0) {
                         return resolve(rows[0])
                     } else {
                         return reject({
                             status: 404, 
                             message: 'Usuario no encontrado'
                         });
                     }
                 }
             )
         }
     ),

     
}


