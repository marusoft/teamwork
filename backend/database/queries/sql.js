export const createUser = 'INSERT INTO users (username, firstName, lastName, email, password, gender, jobRole, department, address) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
export const findEmail = 'SELECT * FROM users WHERE email = $1';
export const findIfUserExist = 'SELECT * FROM users WHERE email = $1';
export const createGif = 'INSERT INTO gifs (gifOwnerId, title, imageUrl) values ($1, $2, $3) returning *';
export const findAGif = 'SELECT * FROM gifs WHERE gifid = $1';
export const deleteOwnGif = 'DELETE FROM gifs WHERE gifid = $1 returning *';
