
module.exports = {
    label: 'notes',
    main: function (api, restOfSystem) {
        api.speak('Welcome to notes', function () {
            api.speak('Right now this program only consists of randomly speaking stuffs', function () {
                api.speak('And now it ends and gives control to the shell', restOfSystem);
            });
        });
    }
}

