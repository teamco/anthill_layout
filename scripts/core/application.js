var App = function App(opts) {

    opts = opts || {};

    this.com = {
        base: new Base(this),
        mode: 'development',
        config: {
            workspace: {
                limit: 1,
                order: []
            }
        },
        log: {
            development: true,
            debug: false,
            show: false,
            cover: false,
            namespace: false,
            type: {
                debug: false,
                log: false,
                info: false,
                error: true,
                warn: true
            }
        },
        lib: {
        }
    };

    this.ui = {
        workspaces: {}
    };

    this.root = this;

    new MVC(this);
};

//App = new App(Routes.storage);
