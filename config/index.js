require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    apiKeyIpstack: process.env.API_KEY_IPSTACK,
};

module.exports = {
    config,
};
