'use strict';
var fs = require('fs'),
	path = require('path'),
	util = require('util'),
	log = require('../../util/log');

module.exports = function createWebsite () {
	return new Website();
}; 

function Website () {}

Website.prototype.create = function create (dest, src) {
	this.write(dest, this.read(src));
};

// TODO: move this to a util module
// TODO: add error checking
Website.prototype.read = function copy (src) {
	return fs.readFileSync(path.join(__dirname, src), 'utf8'); 
};

Website.prototype.write = function read (dest, src) {
	log.message('writing', dest);
	fs.writeFile(dest, src);
};

Website.prototype.load = function load () {
	this.start();
	this.createFolders();
	this.createFiles();
	this.finish();
};

// TODO: 
// - needs some love, running multiple times throws error
// - see if folder exists, prompt to overwrite ? 
Website.prototype.createFolders = function createFolders () {
	fs.mkdir('test');
	fs.mkdir('bootstrap');
	fs.mkdirSync('assets');
	fs.mkdirSync('assets/js');
	fs.mkdirSync('assets/js/vendor');
	fs.mkdirSync('assets/js/lib');
	fs.mkdirSync('assets/css');
	fs.mkdirSync('assets/img');
};

Website.prototype.createFiles = function createFiles () {
	this.create('robots.txt', 'templates/robots.txt');
	this.create('package.json', 'templates/_package.json');
	this.create('component.json', 'templates/component.json');
	this.create('Gruntfile.js', 'templates/Gruntfile.js');
	this.create('.gitignore', 'templates/gitignore');
	this.create('.jshintrc', 'templates/jshintrc');
	// html
	this.create('index.html', 'templates/index.html');
	this.create('bootstrap/index.html', 'templates/bootstrap.html');
	this.create('bootstrap/styleguide.html', 'templates/styleguide.html');
	this.create('bootstrap/grid.html', 'templates/grid.html');
	// js
	this.create('assets/js/main.js', 'templates/js/main.js');
	this.create('assets/js/site.js', 'templates/js/site.js');
	// css
	this.create('assets/css/mixins.scss', 'templates/css/mixins.scss');
	this.create('assets/css/bootstrap.scss', 'templates/css/bootstrap.scss');
	this.create('assets/css/site.scss', 'templates/css/site.scss');
	return;
};

Website.prototype.start = function start () {
	log.message('starting...');
};

Website.prototype.finish = function finish () {
	log.message('finished...');
	log.message('install', 'run npm install && bower install');
};