const excel = require("exceljs");
const readXlsxFile = require("read-excel-file/node");

const dbUtils = require('../utils/db');

module.exports = {
    processExcel(file, userId) {
        return new Promise((resolve, reject) => {
            readXlsxFile(file).then((rows) => {
                rows.shift();
                const values = rows.map((row) =>  [...row.slice(0), userId]);

                const keys = ['codeDelivery', 'clientName', 'state', 'city', 'distric', 'directionDetails', 'phone', 'orderDescription', 'amountPakages', 'totalDimensions', 'limitDate', 'payment', 'userId'];

                if(values.length === 0) {
                    reject(['E503', new Error("Excel file haven't data")])
                }
                dbUtils.bulkInsert('orders', keys, values)
                    .then(() => {
                        resolve()
                    })
                    .catch((error) => {
                        reject(['E502', error])
                    });

            });
        });
    },
    downloadTemplate(res){
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet("Plantilla");

        const template = Array(10).fill(1).map(() => ({
            codeDelivery: 'ABCSJDS',
            clientName: 'Christhoval Barba',
            state: 1,
            city: 'Panama',
            distric: 'San Miguelito',
            directionDetails: 'Los Andes, calle El Lago.',
            phone: '61023295',
            orderDescription: 'lala lala lala lala lala lala lala',
            amountPakages: 12,
            totalDimensions: '12 x 12',
            limitDate: '2020/09/24',
            payment: 10,
        }));

        worksheet.columns = [
            {header: "ID", key: "codeDelivery", width: 5},
            {header: "NOMBRE COMPLETO", key: "clientName", width: 25},
            {header: "ESTADO DE ENTREGA", key: "state", width: 25},
            {header: "CIUDAD", key: "city", width: 25},
            {header: "DISTRITO", key: "distric", width: 25},
            {header: "DIRECCION(ZONA, NUMERO DE CASA, CALLE)", key: "directionDetails", width: 10},
            {header: "CELULAR", key: "phone", width: 25},
            {header: "DESCRIPCION DE ENTREGA", key: "orderDescription", width: 10},
            {header: "CANTIDAD DE PAQUETES", key: "amountPakages", width: 10},
            {header: "PESO (LB)", key: "totalDimensions", width: 10},
            {header: "LIMITE DE TIEMPO PARA ENTREGAR", key: "limitDate", width: 10},
            {header: "PAGO TOTAL", key: "payment", width: 10},
        ];

        worksheet.addRows(template);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=template.xlsx"
        );

        return workbook.xlsx.write(res);
    },
};
