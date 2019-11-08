/* eslint-disable no-console */
import pool from '../../dbConnection';

const gifsTable = `
DROP TABLE IF EXISTS gifs CASCADE;
  CREATE TABLE IF NOT EXISTS gifs(
    id SERIAL PRIMARY KEY NOT NULL,
    gifOwnerId INTEGER NOT NULL,
    title VARCHAR(128) NOT NULL,
    imageUrl TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gifOwnerId) REFERENCES users(id) ON DELETE CASCADE
  )`;

/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function createGifsTable() {
  try {
    const create = await pool.query(gifsTable);
    console.log(`gifsTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`gifsTable: ${error}`);
  }
}

export default createGifsTable;
