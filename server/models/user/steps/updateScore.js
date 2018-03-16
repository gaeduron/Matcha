const database = require('../../../postgresql');
const myErrors = require('../../../errors');

const error = {
    database: myErrors.newFailure({
        log: e => `Database error: models/user/steps/updateScore => ${e}`,
        message: 'Error, please try again later',
    }),
};

const updateScore = async ({ id, score }) => {
    const query = 'UPDATE users SET score = score + $2 WHERE id = $1';

    try {
        await database.query(query, [id, score]);
        return {};
    } catch (e) {
        return error.database(e);
    }
};

module.exports = updateScore;
