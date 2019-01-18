require('dotenv').config({ path: 'process.env' });

var key =  {
    username: process.env.USER_NAME,
    password: process.env.PASS_WORD,
    GOOGLE_API: process.env.GOOGLE_API
};

module.exports = key;