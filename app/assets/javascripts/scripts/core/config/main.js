requirejs.config({

    baseUrl: '../../assets/scripts/core',

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

        'modules/API': {deps: ['extends/function']},
        'modules/Observer': {deps: ['extends/function']},
        'modules/Logger': {deps: ['extends/function']},
        'modules/Setting': {deps: ['extends/function', 'lz-string']},
        'modules/Event': {deps: ['extends/function']},
        'modules/Permission': {deps: ['extends/function']},
        'modules/Page': {deps: ['extends/function']},
        'modules/CRUD': {deps: ['extends/function']},
        'modules/Interactions': {deps: ['extends/function']},
        'modules/Element': {deps: ['extends/function']}
    }

});

define([
    'modernizr',
    'lz-string',
    'jquery',
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