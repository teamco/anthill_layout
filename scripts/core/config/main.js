requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        jquery: 'lib/jquery/jquery-1.9.0.min',
        jqueryui: 'lib/jquery/jquery-ui-1.10.0.custom.min',
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

requirejs([
    'jquery',
    'extends/bind',
    'extends/inherits'
]);

define([
    'config/routes',
    'config/application'
], function defineApp(Routes, Application) {
    requirejs(['test/create'])
});