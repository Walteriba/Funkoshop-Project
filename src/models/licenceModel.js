const { conn } = require("../config/db");
const errorDBhandler = require("../utils/errorHandler");

const getAll = async () => {
  try {
    const [rows] = await conn.query("SELECT * FROM licence;");
    return rows;
  } catch (error) {
    return errorDBhandler(error);
  } finally {
    conn.releaseConnection();
  }
};

module.exports = {
  getAll,
};
