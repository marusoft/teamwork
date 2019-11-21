/* eslint-disable no-console */
import pool from '../../dbConnection';

const articlesCommentTable = `
DROP TABLE IF EXISTS articlescomment CASCADE;
  CREATE TABLE IF NOT EXISTS articlescomment(
    commentId SERIAL PRIMARY KEY NOT NULL,
    articleOwnerCommentId INTEGER NOT NULL,
    authorId INTEGER NOT NULL,
    comment TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (articleOwnerCommentId) REFERENCES articles(articleId) ON DELETE CASCADE,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
  )`;


/**
 * Function representing ArticlesCommentTableHandler
 * @returns {object} representing sucess or failure
 */
async function createArticlesCommentTable() {
  try {
    const create = await pool.query(articlesCommentTable);
    console.log(`articlesCommentTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`articlesCommentTable: ${error}`);
  }
}

export default createArticlesCommentTable;
