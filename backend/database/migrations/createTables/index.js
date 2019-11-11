import createUsersTable from './users';
import createGifsTable from './gifs';
import createArticlesTable from './articles';
import createGifsCommentTable from './gifsComment';
import createArticlesCommentTable from './articlesComment';
import insertAllToTables from '../../seeders/seeds';


(async () => {
  try {
    await createUsersTable();
    await createGifsTable();
    await createArticlesTable();
    await createGifsCommentTable();
    await createArticlesCommentTable();
    await insertAllToTables();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
