const path = require("path");
const multer = require("multer");

const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ) {
        cb(null, true);
    } else {
        cb(false, false);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__basedir, "/data/uploads/"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-movven-${file.originalname}`);
    },
});

const uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;
