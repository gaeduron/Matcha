const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
    database: myErrors.newFailure({
        log: e => `Database error: models/user/steps/updateLastConnection => ${e}`,
        message: 'Error, please try again later',
    }),
};

const updateSessionToken = async ({ id }) => {
    const query = 'UPDATE users SET last_connection = localtimestamp WHERE id = $1';

    try {
        await database.query(query, [id]);
        return {};
    } catch (e) {
        return error.database(e);
    }
};

module.exports = updateSessionToken;
