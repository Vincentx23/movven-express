const db = require("../../database");

function bulkInsert(table, keys, values) {
    const query = `INSERT INTO ${table} (${keys.join(',')}) VALUES ?`;

    return new Promise((resolve, reject) => {
        db.query(query, [values], function(err, result) {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {
    bulkInsert,
};
