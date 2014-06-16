requirejs.config({

    baseUrl: '../../scripts/core',

    paths: {
        // Define public application path
        'public': '../../public',

        config: 'config',

        api: 'api',

        controller: 'controller',
        model: 'model',
        view: 'view',

        event: 'event',
        permission: 'permission',

        'extends': 'lib/extends',

        modules: 'lib/modules',
        plugins: '../plugins',

        test: 'test',

        modernizr: 'lib/modernizr',
        'lz-string': 'lib/lz-string',

        jquery: 'lib/jquery/jquery-2.1.1',
        'jquery.ui': 'lib/jquery/jquery-ui-1.10.4.custom',
        'jquery.resizestop': 'lib/jquery/jquery.resizestop'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        'jquery.ui': {deps: ['jquery']},
        'jquery.resizestop': {deps: ['jquery']},
        'extends/function': {deps: ['jquery']},
        'extends/string': {deps: ['jquery']},
        'extends/array': {deps: ['jquery']},

        'controller/layout/layout.empty.rows': {deps: ['extends/function']},
        'controller/layout/layout.empty.columns': {deps: ['extends/function']},
        'controller/layout/layout.intersect': {deps: ['extends/function']},

        'controller/behavior/behavior.crud': {deps: ['extends/function']},
        'controller/behavior/behavior.window.resize': {deps: ['extends/function']},

        'controller/widget/widget.map': {deps: ['extends/function']},
        'controller/widget/widget.wireframe': {deps: ['extends/function']},

        'modules/api': {deps: ['extends/function']},
        'modules/observer': {deps: ['extends/function']},
        'modules/logger': {deps: ['extends/function']},
        'modules/setting': {deps: ['extends/function', 'lz-string']},
        'modules/event': {deps: ['extends/function']},
        'modules/permission': {deps: ['extends/function']},
        'modules/page': {deps: ['extends/function']},
        'modules/crud': {deps: ['extends/function']},
        'modules/interactions': {deps: ['extends/function']},
        'modules/element': {deps: ['extends/function']}
    }

});

define([
    'modernizr',
    'lz-string',
    'jquery',
    'jquery.ui',
    'jquery.resizestop',
    'extends/function',
    'extends/json',
    'extends/event',
    'extends/string',
    'extends/array'
], function loadConfig() {

    require([
        'config/listeners',
        'config/permission'
    ]);

    return require([
        'config/anthill'
    ]);

});