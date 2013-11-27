var common = require('./common');
var path = require('path');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;

common.speak('Hello! This is INTERNET\'s');

var events = new EventEmitter();
var programEvents = new EventEmitter();

var programs = fs.readdirSync(path.join(__dirname, 'programs')).map(require);


