import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connect;

if (process.env.NODE_ENV === 'test') {
  connect = {
    connectionString: process.env.TEST_DATABASE_URL,
  };
}
connect = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(connect);

export default pool;
