const path = require("path");
const controller = {};

const {processExcel, downloadTemplate} = require('../services/excel');


controller.upload = (req,res) => {
    try {
        if (req.file === undefined) {
            return res.status(400).json({
                success: false,
                code: 'E501',
                error: 'Please upload an excel file!'
            });
        }

        const file = path.join(__basedir, "/data/uploads/", req.file.filename);

        processExcel(file, req.userId)
            .then(() => {
                res.status(200).json({
                    success: true,
                    code: '0'
                });
            })
            .catch(([code, error]) => {
                res.status(400).json({
                    success: false,
                    code,
                    error: `Fail to import data into database!, ${error.message}`,
                });
            });

    } catch (error) {
        res.status(500).json({
            success: false,
            code: 'E500',
            error: `Could not upload the file: ${req.file.originalname}, ${error.message}`
        });
    }
};

controller.download = (req, res) => {
    return downloadTemplate(res).then(() => {
        res.status(200).end();
    });
};



module.exports = controller;
