const excel = require("exceljs");
const readXlsxFile = require("read-excel-file/node");

const dbUtils = require('../utils/db');

module.exports = {
    processExcel(file, userId) {
        return new Promise((resolve, reject) => {
            readXlsxFile(file).then((rows) => {
                rows.shift();
                const values = rows.map((row) => [...row.slice(0, -1), userId]);

                const keys = ['codeDelivery', 'clientName', 'state', 'distric', 'directionDetails', 'phone', 'orderDescription', 'amountPakages', 'totalDimensions', 'limitDate', 'userId'];

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
            codeDelivery: 123,
            clientName: 'Christhoval Barba',
            state: 'Panama',
            Distric: 'San Miguelito',
            Directiondetail: 'Los Andes, calle El Lago.',
            phone: '61023295',
            Orderdescription: 'lala lala lala lala lala lala lala',
            AmountPackage: 12,
            Totaldimension: 123,
            Limitdate: '2020/09/24',
            total: 10.99,
        }));

        worksheet.columns = [
            {header: "ID", key: "codeDelivery", width: 5},
            {header: "NOMBRE COMPLETO", key: "clientName", width: 25},
            {header: "PROVINCIA", key: "state", width: 25},
            {header: "DISTRITO", key: "Distric", width: 25},
            {header: "DIRECCION(ZONA, NUMERO DE CASA, CALLE)", key: "Directiondetail", width: 10},
            {header: "CELULAR", key: "phone", width: 25},
            {header: "DESCRIPCION DE ENTREGA", key: "Orderdescription", width: 10},
            {header: "CANTIDAD DE PAQUETES", key: "AmountPackage", width: 10},
            {header: "PESO (LB)", key: "Totaldimension", width: 10},
            {header: "LIMITE DE TIEMPO PARA ENTREGAR", key: "Limitdate", width: 10},
            {header: "PAGO TOTAL", key: "total", width: 10},
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
