'use strict';

var child_process = require('child_process');
var querystring = require('querystring');
var temp = require('temp');
var fs = require('fs');
var q = require('q');

var ttsEndpoint = 'http://translate.google.com/translate_tts';
var ttsArgs = {tl: 'en_US'}

/**
 * Speak a string using teh google translate service's tts service.
 */
function speak(text) {
    var qs = JSON.parse(JSON.stringify(ttsArgs));
    qs['q'] = text;
    var ttsUrl = ttsEndpoint + '?' + querystring.stringify(qs);

    return playFile(ttsUrl);
}

function playFile(fileName) {
    var mplayer = child_process.spawn('mplayer', [fileName]);
    var deferred = q.defer();
    mplayer.on('exit', function (errCode) {
        if (errCode !== 0) {
            return deferred.reject(new Error('mplayer exited with non-zero exit code ' + errCode));
        }
        deferred.resolve();
    });
    return deferred.promise;
}

/**
 * Record to a file, given filename. call stopRecording() on the returned promise to stop recording and resolve the promise with the resulting file info (see https://github.com/bruce/node-temp#temporary-files)
 */
function recordToFile(fileName) {
    var recorder = child_process.spawn('arecord', [
        '-r', '48000', fileName]);
    var deferred = q.defer();
    var killedByUser = false;
    recorder.on('exit', function () {
        if (!killedByUser) {
            deferred.reject(new Error('arecord exited unexpectedly'));
        } else {
            deferred.resolve(fileName);
        }
    });
    deferred.stopRecording = function () {
        killedByUser = true;
        recorder.kill('SIGINT');
    };
    return deferred;
};

module.exports = {
    speak: speak
}

