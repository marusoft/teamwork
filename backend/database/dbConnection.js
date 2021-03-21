import 'dotenv/config';
import { Pool } from 'pg';

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

pool.on('connect', () => {
  console.log(`successfully connected to ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database`);
});

export default pool;
