define(function defineConfig() {
    return {
        services: [
            {name: 'keen.io', load: false},
            {name: 'raygun.io', load: true}
        ],
        html: {
            container: 'body',
            header: true
        }
    }
});