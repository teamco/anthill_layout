requirejs.config({
    baseUrl: 'scripts/core',
    paths: {
        config: 'config',
        jquery: 'lib/jquery/jquery-1.8.2.min',
        jqueryui: 'lib/jquery/jquery-ui-1.9.1.custom.min',
        application: 'application',
        controller: 'controller',
        model: 'model',
        event: 'event',
        view: 'view',
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
    'application',
    'controller/workspace/workspace',
    'controller/page/page'
], function defineApp(Routes, Application) {
    window.app = new Application();
});