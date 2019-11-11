/* eslint-disable no-console */
import dotenv from 'dotenv';
import pool from '../dbConnection';
import Helper from '../../helperUtils/Utils';

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(firstName, lastName, email, password, gender, jobRole, department, address) 
      VALUES ('kehinde', 'alimi', 'alimi@automart.com', '${hashedPassword}', 'male', 'admin', 'HR', '3, Olourunosebi street, Oni, Lagos.'),
             ('moyosore', 'omodada', 'moyosore@automart.com', '${hashedPassword}', 'female', 'employee', 'Engineering' ,'3,Talomoola Street, ajumobi, Lagos.');

      INSERT INTO gifs(gifownerId, title, imageUrl) 
      VALUES ( 2, 'cat developer', 'http://giphygifs.s3.amazonaws.com/media/11JTxkrmq4bGE0/giphy.gif'),
             ( 1, 'cat developer', 'http://giphygifs.s3.amazonaws.com/media/l9Jhzwdi09Ve0/giphy.gif');
      `;

/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function insertAllToTables() {
  try {
    const create = await pool.query(addAllsqlTableQueries);
    console.log(`addAllsqlTableQueries: ${create[0].command}ED`);
  } catch (error) {
    console.log(`addAllsqlTableQueries: ${error}`);
  }
}

export default insertAllToTables;
