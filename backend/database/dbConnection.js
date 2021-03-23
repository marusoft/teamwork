import 'dotenv/config';
import { Pool } from 'pg';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

let connect;

if (process.env.NODE_ENV === 'test') {
  connect = {
    connectionString: process.env.TEST_DATABASE_URL,
    idleTimeoutMillis: 30000,
  };
}
connect = {
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 30000,
};

const pool = new Pool(connect);

pool.on('connect', () => {
  console.log(`successfully connected to ${process.env.NODE_ENV === 'test' ? 'test' : 'development'} database`);
});

export default pool;
