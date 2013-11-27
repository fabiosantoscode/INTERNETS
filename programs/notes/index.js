
module.exports = {
    label: 'notes',
    main: function (api) {
        return api.io.speak('Welcome to notes')
            .then(function () {
                return api.io.speak('Right now this program only consists of randomly speaking stuffs');
            })
            .then(function () {
                return api.io.speak('And now it ends and gives control to the shell');
            });
    }
}

