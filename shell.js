var path = require('path');
var io = require('./io');
var fs = require('fs');
var q = require('q');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var programEvents = new EventEmitter();

var apis = require('./apis');

function promptUserForProgram() {
    return io.speak('choose a program')
        .then(function () {
            return require('./programs/notes');
        });
}

function runProgram(program) {
    return program.main(apis)
        .fail(function (err) {
            var err = 'program ' + program.label + ' failed: ' + err;
	    console.log(err);
	    return apis.io.speak(err);
        })
	.fail(function () { console.log('Was not able to speak. Bye!'); });
}

function mainLoop() {
    return io.speak('internets\'s')
        .then(promptUserForProgram)
        .then(runProgram)
        .finally(mainLoop)
}

mainLoop();
