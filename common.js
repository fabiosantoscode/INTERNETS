var child_process = require('child_process');
var querystring = require('querystring');

var ttsEndpoint = 'http://translate.google.com/translate_tts';
var ttsArgs = {tl: 'en_US'}

/**
 * Speak a string using teh google translate service's tts service.
 */
function speak(text, cb) {
    var qs = JSON.parse(JSON.stringify(ttsArgs));
    qs['q'] = text;
    var ttsUrl = ttsEndpoint + '?' + querystring.stringify(qs);

    playFile(ttsUrl, cb);
}

function playFile(fileName, cb) {
    var mplayer = child_process.spawn('mplayer', [fileName]);
    if (cb) { mplayer.on('exit', cb); }
}

/**
 * Record to a file, given filename. Returns a callback so you can say when you're done.
 */
function recordToFile(fileName, cb) {
    var recorder = child_process.spawn('arecord', [
        '-r', '48000', fileName]);
    recorder.on('exit', function () {
        cb();
    });
    return function () {
        recorder.kill('SIGINT');
    }
}

module.exports = {
    speak: speak
}

