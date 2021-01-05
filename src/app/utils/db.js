const db = require("../../database");

function bulkInsert(table, keys, values) {
    const query = `INSERT INTO ${table} (${keys.join(',')}) VALUES ?`;
    console.log(keys);
    return new Promise((resolve, reject) => {
        db.query(query, [values], function(err, result) {
            console.log(values);
            if(err){
                reject(err);
            }
            resolve(result);
        });
    });
}


function actualDate(){
    const query = `SELECT DATE_SUB(now(), INTERVAL 5 HOUR) as 'date'`;
    return new Promise((resolve, reject) => {
        db.query(query, [], function(err, result) {
            if(err) {
                reject(err);
            }
            resolve(result)
        });
    });
}

module.exports = {
    bulkInsert,
    actualDate
};
