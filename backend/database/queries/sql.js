// USERS
export const createUser = 'INSERT INTO users (username, firstname, lastname, email, password, gender, jobrole, department, address) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
export const findEmail = 'SELECT * FROM users WHERE email = $1';
export const findIfUserExist = 'SELECT * FROM users WHERE email = $1';
export const findUser = 'SELECT * FROM users WHERE id = $1';
export const findAllUser = `SELECT id, username firstName, lastName, gender, department, address, email FROM users 
`;

// GIFS
export const createGif = 'INSERT INTO gifs (gifOwnerId, title, imageUrl, category) values ($1, $2, $3, $4) returning *';
export const findAGif = 'SELECT * FROM gifs WHERE gifid = $1';
export const deleteOwnGif = 'DELETE FROM gifs WHERE gifid = $1 returning *';

export const createCommentForGifs = `
    WITH inserted AS (
      INSERT INTO gifscomment (
        comment,
        gifsOnCommentId,
        gifownerid
      )   VALUES ($1, $2, $3)
      RETURNING *
    )
    SELECT comment, inserted.createdOn, title, imageUrl, category
    FROM inserted JOIN gifs ON inserted.gifsOnCommentId = gifs.gifid
    `;

export const getSingleGif = 'SELECT createdon, title, imageUrl FROM gifs WHERE gifid = $1';

export const getSingleGifComments = 'SELECT commentid, comment, gifownerid FROM gifscomment WHERE gifsoncommentid = $1';

// ARTICLES
export const createArticle = 'INSERT INTO articles (authorId, title, article, category) values ($1, $2, $3, $4) returning *';
export const findAnArticle = 'SELECT * FROM articles WHERE articleid = $1';
export const modifyArticle = 'UPDATE articles SET title = $1 , article = $2, category = $3 WHERE articleId = $4 and authorId = $5 RETURNING *';
export const deleteOwnArticle = 'DELETE FROM articles WHERE articleid = $1 returning *';

export const createCommentForArticle = `
    WITH inserted AS (
      INSERT INTO articlescomment (
        comment,
        articleOnCommentId,
        authorid
      )   VALUES ($1, $2, $3)
      RETURNING *
    )
    SELECT comment, inserted.createdOn, title, article, category 
    FROM inserted JOIN articles ON inserted.articleOnCommentId = articles.articleid
    `;

export const getSingleArticle = 'SELECT createdon, title, article, category FROM articles WHERE articleid = $1';

export const getSingleArticleComments = 'SELECT commentid, comment, authorid FROM articlescomment WHERE articleoncommentid = $1';

// FEED
export const viewAllArticlesOrGifs = `
    SELECT
      articleid AS id,
      createdon,
      title,
      article AS feedcontent,
      authorid AS authorId,
      'article' AS type
    FROM articles
    WHERE authorid = $1
    UNION
    SELECT
      gifid AS id,
      createdon,
      title,
      imageurl AS feedcontent,
      gifownerid AS authorId,
      'gif' AS type
    FROM gifs
    WHERE gifid = $1
    ORDER BY createdon ASC;
  `;

export const articlesByCategory = 'SELECT * FROM articles WHERE category = $1';
export const allarticles = 'SELECT * FROM articles';
