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
    'extends/bind',
    'extends/inherits',

    'modules/base',
    'modules/base/function',
    'modules/base/array',
    'modules/base/hash',
    'modules/base/number',
    'modules/base/html',
    'modules/base/generator',

    'modules/mvc',

    'application'

]);