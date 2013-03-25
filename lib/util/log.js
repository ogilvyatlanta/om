var pkg = require('../../package.json');
var colors = require('./colors');

module.exports = {

	help: function() {
		var message = [
			'',
			'Usage: ' + pkg.name +' <command>',
			'',
			pkg.name + ' -h'.input + '		quick help on commands',
			pkg.name + ' -v'.input + '		display version',
			pkg.name + ' website'.input + '	create default website scaffolding',
			''
		].join('\n');

		return console.log(message);	
	},

	error: function(msg) {
		return this.message('error', msg);
	},

	message: function (type, msg) {
		var type = type || '',
		msg = msg || '';
		return console.log(pkg.name + ' ' + type.input + ' ' + msg);
	}
};