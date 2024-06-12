const multer =  require('multer');
const path = require('path');

// Logica para guardar las imagenes en el server 
const storage = multer.diskStorage({
    // donde guardar los archivos
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../../public/images')),
    // con que nombre guardar los archivos (el date es para asegurar que el nombre del arch sea unico)
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  });

const uploadFiles = multer({storage});

module.exports = uploadFiles;
