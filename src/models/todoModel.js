const mysql = require('mysql2/promise');
const { dbConfig } = require('../dbConfigs');

async function insertTodoDb(data) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    INSERT INTO list (title) 
    VALUES (?)`;
    const [insertData] = await connection.execute(sql, [data.title]);
    await connection.close();
    return insertData;
  } catch (error) {
    return error;
  }
}

async function getDataFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    SELECT * FROM list`;
    const [data] = await connection.execute(sql);
    await connection.close();
    return data;
  } catch (error) {
    return error;
  }
}

async function updateTask(data, id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(`
    UPDATE list
    SET title = ${mysql.escape(data.title)}
    WHERE id = ${mysql.escape(id)}`);
    await connection.close();
    return result;
  } catch (error) {
    return error;
  }
}

async function deleteTask(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
    DELETE FROM list 
    WHERE id = ${mysql.escape(id)}
    LIMIT 1`;
    const [result] = await connection.execute(sql);
    await connection.close();
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  insertTodoDb,
  getDataFromDb,
  updateTask,
  deleteTask,
};
