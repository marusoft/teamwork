export const createUser = 'INSERT INTO users (firstName, lastName, email, password, gender, jobRole, department, address) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *';
export const findEmail = 'SELECT * FROM users WHERE email = $1';
export const findIfUserExist = 'SELECT * FROM users WHERE email = $1';
