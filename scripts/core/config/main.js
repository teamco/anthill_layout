requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        config: '../core/config',
        jquery: 'jquery/1.8.2/jquery.min',
        application: '../core/application',
        controller: '../core/controller',
        model: '../core/model',
        view: '../core/view',
        extends: '../core/extends',
        modules: 'modules'
    }
});

requirejs([
    'config/routes',
    'jquery',
    'application',
    'extends/bind', 
    'extends/inherits',
    'modules/base'
]);