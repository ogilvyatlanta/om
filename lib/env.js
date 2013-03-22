
var Environment = module.exports = function createEnvirnoment(args, opts) {};

// Runs a command
// Assumes command is a generator
// TODO: add in error checking
// TODO: add in registering available commands
Environment.prototype.run = function (args, opts) {
	var name = args[0];
	var generator = require('./generators/' + name)();

	generator.load();
	
};
