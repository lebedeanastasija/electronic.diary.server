const Class = require('../../models/index').class;

function getAll() {
	return Class.findAll()
	.catch(err => {
		console.error(err);
		return Promise.reject({status: 500,  message: err.message}); 
	});
}

function getById(id) {
	return Class.find({where: {id}})
	.catch(err => {
		console.error(err);
		return Promise.reject({status: 500,  message: err.message});
	});
}

module.exports = {
	getAll,
	getById
};