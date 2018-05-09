// ====================================================
// Settings
// ====================================================

let fs = require('fs');

let development, production;

if(fs.existsSync('./config/env/development.json'))
    development = require('./env/development.json');

if(fs.existsSync('./config/env/production.json'))
    production  = require('./env/production.json');

// Get all environments
let environment = {
    development : development,
    production  : production,
};

let NODE_ENV = process.env.NODE_ENV || 'development';

// Export the configuration for the current environment
module.exports = environment[NODE_ENV];