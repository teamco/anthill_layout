requirejs.config({

    baseUrl: '../../assets/scripts/core',
	
    waitSeconds: 200,

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
        'jquery.ujs': 'lib/jquery/jquery_ujs',
        'jquery.ui': 'lib/jquery/jquery-ui.min',
        'jquery.resizestop': 'lib/jquery/jquery.resizestop',
        'jquery.pseudo': 'lib/jquery/jquery.pseudo',

        // create alias to plugins (not needed if plugins are on the baseUrl)
        // https://github.com/millermedeiros/requirejs-plugins
        defer: 'lib/require/defer',
        async: 'lib/require/async',
        font: 'lib/require/font',
        goog: 'lib/require/goog',
        image: 'lib/require/image',
        json: 'lib/require/json',
        noext: 'lib/require/noext',
        mdown: 'lib/require/mdown',
        text: 'lib/require/text',
        propertyParser: 'lib/require/propertyParser',
        markdownConverter: 'lib/require/Markdown.Converter'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        'jquery.ujs': {deps: ['jquery']},
        'jquery.ui': {deps: ['jquery']},
        'jquery.resizestop': {deps: ['jquery']},
        'jquery.pseudo': {deps: ['jquery']},
        'extends/function': {deps: ['jquery']},
        'extends/string': {deps: ['jquery']},
        'extends/array': {deps: ['jquery']},
        'lib/jquery/jquery.knob': {deps: ['jquery']},
        'lib/jquery/jquery.nicescroll': {deps: ['jquery']},

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
    'jquery.ujs',
    'jquery.resizestop',
    'jquery.pseudo',
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