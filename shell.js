var common = require('./common');
var path = require('path');
var fs = require('fs');
var q = require('q');
var EventEmitter = require('events').EventEmitter;

var events = new EventEmitter();
var programEvents = new EventEmitter();


var apis = require('./apis');

function nextProgram(cb) {
    cb(require('./programs/notes'));
}

function mainLoop() {
    common.speak('internet\'s', function () {
        nextProgram(function (program) {
            program.main(apis, function () {
                mainLoop();
            })
        });
    });
}

mainLoop();
