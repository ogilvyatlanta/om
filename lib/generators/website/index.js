'use strict';
var fs = require('fs-extra'),
	_ = require('underscore'),
	config = require('./load-config'),
	log = require('../../util/log');

module.exports = function createWebsite () {
	return new Website();
}; 

function Website () {}

Website.prototype.copy = function copy (src, dest, cb) {

	cb = cb || function(){};

	fs.copy(__dirname+'/'+src, dest, function(err){
		if (err) {
			log.error(err);
		} else {
			cb.call(this);
		}
	});

};

Website.prototype.load = function load () {

	var self = this,
		count = 0;

	self.start();

	_.each(config, function(asset){
		self.copy(asset.src, asset.dest, function() {
			log.message('created', asset.dest.toString());
			count++;
			if(count == config.length) {
				self.finish();
			}
		});
	});
};

Website.prototype.start = function start () {
	log.message('starting...');
};

Website.prototype.finish = function finish () {
	log.message('finished...');
	log.message('install', 'run npm install && bower install');
};