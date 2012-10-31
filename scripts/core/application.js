require([], function loadApplication() {
    var App = function App(opts) {
        this.opts = opts || {};
        this.com = {
            base: new Base(this),
            lib: {
            }
        };

    };

    window.App = new App();
});