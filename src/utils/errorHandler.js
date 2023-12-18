const  errorDBhandler = (error) => {
    const message = `No pudimos realizar la petición ${error}`;
    return message 
};

module.exports = errorDBhandler
