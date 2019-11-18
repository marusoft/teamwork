/* eslint-disable no-console */
import dotenv from 'dotenv';
import pool from '../dbConnection';
import Helper from '../../helperUtils/Utils';

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(username, firstName, lastName, email, password, gender, jobRole, department, address) 
      VALUES ('marusoft' ,'kehinde', 'alimi', 'alimi@teamwork.com', '${hashedPassword}', 'male', 'admin', 'HR', '3, Olourunosebi street, Oni, Lagos.'),
             ( 'moyo' ,'moyosore', 'omodada', 'moyosore@teamwork.com', '${hashedPassword}', 'female', 'employee', 'Engineering' ,'3,Talomoola Street, ajumobi, Lagos.');

      INSERT INTO gifs(gifownerId, title, imageUrl) 
      VALUES ( 2, 'cat developer', 'http://res.cloudinary.com/marusofteamwork/image/upload/v1573995345/b2j6f4ascsrvvm76ebje.gif'),
             ( 1, 'cat developer', 'http://res.cloudinary.com/marusofteamwork/image/upload/v1573995345/b2j6f4ascsrvvm76ebje.gif');
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
