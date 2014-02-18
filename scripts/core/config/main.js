define(function loadConfig() {

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

            test: 'test',

            jquery: 'lib/jquery/jquery-2.1.0.min',
            'jquery.ui': 'lib/jquery/jquery-ui-1.10.4.custom.min'
        },

        shim: {
            'jquery.ui': {deps: ['jquery']},
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
            'modules/setting': {deps: ['extends/function']},
            'modules/event': {deps: ['extends/function']},
            'modules/permission': {deps: ['extends/function']},
            'modules/page': {deps: ['extends/function']},
            'modules/crud': {deps: ['extends/function']},
            'modules/interactions': {deps: ['extends/function']},
            'modules/element': {deps: ['extends/function']}
        }

    });

    return require([
        'jquery',
        'jquery.ui',
        'extends/function',
        'extends/json',
        'extends/event',
        'extends/string',
        'extends/array'
    ], function loadMandatoryConfig() {

        return require([
            'modules/base',
            'modules/i18n'
        ], function initBase(Base, i18n) {

            /**
             * Define global application instance
             * @type {{}}
             */
            window.anthill = {};

            /**
             * Define global base
             * @type {Base}
             */
            window.anthill.base = new Base();

            /**
             * Define global translations
             * @type {i18n}
             */
            window.anthill.i18n = new i18n('en-us');

            return require([
                'config/listeners',
                'config/permission'
            ]);
        });
    });
});