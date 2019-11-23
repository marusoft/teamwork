/* eslint-disable no-console */
import pool from '../../dbConnection';

const gifsCommentTable = `
DROP TABLE IF EXISTS gifscomment CASCADE;
  CREATE TABLE IF NOT EXISTS gifscomment(
    commentId SERIAL PRIMARY KEY NOT NULL,
    gifsOnCommentId INTEGER NOT NULL,
    gifOwnerId INTEGER NOT NULL,
    comment TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (gifsOnCommentId) REFERENCES gifs(gifId) ON DELETE CASCADE,
    FOREIGN KEY (gifOwnerId) REFERENCES users(id) ON DELETE CASCADE
  )`;

/**
 * Function representing createGifsCommentTable
 * @returns {object} representing sucess or failure
 */
async function createGifsCommentTable() {
  try {
    const create = await pool.query(gifsCommentTable);
    console.log(`gifsCommentTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`gifsCommentTable: ${error}`);
  }
}

export default createGifsCommentTable;
