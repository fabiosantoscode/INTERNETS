var common = require('./common');
var path = require('path');
var fs = require('fs');
var q = require('q');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var programEvents = new EventEmitter();


var apis = require('./apis');

function promptUserForProgram() {
    return common.speak('choose a program')
        .then(function () {
            return require('./programs/notes');
        });
}

function mainLoop() {
    return common.speak('internets\'s')
        .then(promptUserForProgram)
        .then(function (program) {
            return program.main(apis)
        })
        .then(mainLoop)
}

mainLoop();
