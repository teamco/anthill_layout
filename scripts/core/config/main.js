requirejs.config({
    baseUrl: 'scripts/lib',
    paths: {
        config: '../core/config',
        jquery: 'jquery/1.8.2/jquery.min',
        application: '../core/application',
        controller: '../core/controller',
        model: '../core/model',
        view: '../core/view',
        extends: 'extends',
        modules: 'modules'
    }
});

requirejs([
    'jquery',
    'extends/bind',
    'extends/inherits'
]);

define([
    'config/routes',
//    'modules/base/function',
//    'modules/base/array',
//    'modules/base/hash',
//    'modules/base/number',
//    'modules/base/html',
//    'modules/base/generator',
//
//    'modules/mvc',
//
    'application'
//
//    'controller/workspace/workspace',
//    'controller/workspace/workspace.controller',
//    'model/workspace.model'
//
], function initApp(Routes, Application) {
    window.app = new Application();
});