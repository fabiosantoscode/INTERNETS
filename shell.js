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
            // For now...
            return require('./programs/notes');
        });
}

function ggkthxbai(err) {
    console.error('Was not able to speak (' + err + '). Bye!');
    process.exit(1);
}

function runProgram(program) {
    return program.main(apis)
        .fail(function (err) {
            var errMsg = 'program ' + program.label + ' failed: ' + err;
	    console.error(errMsg);
	    return apis.io.speak(errMsg).then(err);
        });
}

function mainLoop() {
    return io.speak('internets\'s').fail(ggkthxbai)
        .then(promptUserForProgram)
        .then(runProgram)
        .finally(mainLoop)
}

mainLoop();
