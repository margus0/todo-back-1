require('dotenv').config();

module.exports = {
  dbConfig: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  },
  serverPort: process.env.PORT || 8080,
};
