requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        jquery: 'lib/jquery/jquery-1.9.1.min',
        jqueryui: 'lib/jquery/jquery-ui-1.10.1.custom.min',
        application: 'application',
        controller: 'controller',
        model: 'model',
        event: 'event',
        view: 'view',
        test: 'test',
        extends: 'lib/extends',
        modules: 'lib/modules'
    }
});

define([
    'config/routes',
    'config/application'
], function defineApp(Routes, Application) {

    requirejs(['config/listeners','test/create'])
});