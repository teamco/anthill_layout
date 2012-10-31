requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
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
    'jquery', 
    'application',
    'extends/bind', 
    'extends/inherits',
    'modules/base'
]);