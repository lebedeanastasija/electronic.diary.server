const Administrator = require('../../models/index').administrator;

function create(login, password) {
  return Administrator.create({login, password});
}

function signIn(login, password) {
  return Administrator.findOne({
    where: {login, password}
  })
  .then(admin => {
    console.log('OK');
    return Promise.resolve(admin);
  })
  .catch(err => {
    console.error('Can not find admin:', err.message);
    return Promise.reject({status: 500, message: 'Login or password is not correct!'});
  })
}

module.exports = {
  create,
  signIn
};