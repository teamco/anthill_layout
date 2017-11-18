requirejs.config({

  baseUrl: '/assets/scripts/core',

  waitSeconds: 200,

  paths: {
    // Define public application path
    'public': '/assets/public',

    config: 'config',

    api: 'api',

    controller: 'controller',
    model: 'model',
    view: 'view',

    event: 'event',
    permission: 'permission',

    'extends': 'lib/extends',

    modules: 'lib/modules',
    plugins: '/assets/scripts/plugins',

    services: '/assets/services',

    tinymce: 'lib/packages/tinymce/tinymce.min',
    moment: 'lib/packages/moment',

    modernizr: 'lib/modernizr',

    bootstrap: 'lib/packages/bootstrap/bootstrap.min',
    'bootstrap-dialog': 'lib/packages/bootstrap/plugins/dialog/bootstrap-dialog.min',

    underscore: 'lib/_/underscore.min',

    html2canvas: 'lib/packages/html2canvas.min',

    'lz-string': 'lib/lz-string',
    jquery: 'lib/jquery/jquery.min',
    'jquery.ujs': 'lib/jquery/jquery_ujs',
    'jquery.timeago': 'lib/jquery/jquery.timeago',
    'jquery.ui': 'lib/jquery/jquery-ui.min',
    'jquery.resizestop': 'lib/jquery/jquery.resizestop',
    'jquery.zoomooz': 'lib/jquery/jquery.zoomooz.min',

    // create alias to plugins (not needed if plugins are on the baseUrl)
    // https://github.com/millermedeiros/requirejs-plugins
    // https://github.com/SBoudrias/require.replace
    // https://github.com/SlexAxton/require-handlebars-plugin
    defer: 'lib/require/defer',
    async: 'lib/require/async',
    cache: 'lib/require/cache',
    font: 'lib/require/font',
    goog: 'lib/require/goog',
    image: 'lib/require/image',
    json: 'lib/require/json',
    noext: 'lib/require/noext',
    mdown: 'lib/require/mdown',
    text: 'lib/require/text',
    replace: 'lib/require/replace',
    hbs: 'lib/require/hbs',
    propertyParser: 'lib/require/propertyParser',
    markdownConverter: 'lib/require/Markdown.Converter'
  },

  shim: {
    tinymce: {
      exports: 'tinyMCE',
      init: function () {
        this.tinyMCE.DOM.events.domLoaded = true;
        return this.tinyMCE;
      }
    },
    jquery: {
      exports: '$'
    },
    'jquery.ujs': {deps: ['jquery']},
    'jquery.ui': {deps: ['jquery']},
    'jquery.resizestop': {deps: ['jquery']},
    'jquery.zoomooz': {deps: ['jquery']},
    'extends/function': {deps: ['jquery']},
    'extends/string': {deps: ['jquery']},
    'extends/array': {deps: ['jquery']},

    'lib/modules/MVC': {
      deps: [
        'extends/function',
        'extends/string',
        'extends/array'
      ]
    },

    bootstrap: {deps: ["jquery"]},
    'bootstrap-dialog': {deps: ['jquery'], exports: 'BootstrapDialog'},

    'config/listeners': {deps: ['extends/function']},
    'config/listeners/application.listeners': {deps: ['extends/function']},
    'config/listeners/workspace.listeners': {deps: ['extends/function']},
    'config/listeners/page.listeners': {deps: ['extends/function']},
    'config/listeners/layout.listeners': {deps: ['extends/function']},
    'config/listeners/widget.listeners': {deps: ['extends/function']},

    'config/permissions': {deps: ['extends/function']},
    'config/permissions/application.permissions': {deps: ['extends/function']},
    'config/permissions/workspace.permissions': {deps: ['extends/function']},
    'config/permissions/page.permissions': {deps: ['extends/function']},
    'config/permissions/layout.permissions': {deps: ['extends/function']},
    'config/permissions/widget.permissions': {deps: ['extends/function']},

    'config/anthill': {deps: ['extends/function']},
    'config/application': {deps: ['extends/function']},
    'config/layout': {deps: ['extends/function']},
    'config/page': {deps: ['extends/function']},
    'config/routes': {deps: ['extends/function']},
    'config/widget': {deps: ['extends/function']},
    'config/workspace': {deps: ['extends/function']},

    'controller/behavior/behavior.crud': {deps: ['extends/function']},
    'controller/behavior/behavior.error.handler': {deps: ['extends/function']},
    'controller/behavior/behavior.fix.vulnerabilities': {deps: ['extends/function']},
    'controller/behavior/behavior.window.resize': {deps: ['extends/function']},

    'controller/layout/layout.empty.columns': {deps: ['extends/function']},
    'controller/layout/layout.empty.rows': {deps: ['extends/function']},
    'controller/layout/layout.expand': {deps: ['extends/function']},
    'controller/layout/layout.grid': {deps: ['extends/function']},
    'controller/layout/layout.intersect': {deps: ['extends/function']},
    'controller/layout/layout.overlapping': {deps: ['extends/function']},

    'controller/page/page.layer': {deps: ['extends/function']},
    'controller/page/page.layout': {deps: ['extends/function']},
    'controller/page/page.widget': {deps: ['extends/function']},
    'controller/page/page.widget.copy': {deps: ['extends/function']},
    'controller/page/page.maximize': {deps: ['extends/function']},

    'controller/production/production': {deps: ['extends/function']},

    'controller/widget/widget.comment': {deps: ['extends/function']},
    'controller/widget/widget.content': {deps: ['extends/function']},
    'controller/widget/widget.drag': {deps: ['extends/function']},
    'controller/widget/widget.expand': {deps: ['extends/function']},
    'controller/widget/widget.interactions': {deps: ['extends/function']},
    'controller/widget/widget.layer': {deps: ['extends/function']},
    'controller/widget/widget.map': {deps: ['extends/function']},
    'controller/widget/widget.maximize': {deps: ['extends/function']},
    'controller/widget/widget.overlapping': {deps: ['extends/function']},
    'controller/widget/widget.parallax': {deps: ['extends/function']},
    'controller/widget/widget.resize': {deps: ['extends/function']},
    'controller/widget/widget.scroll': {deps: ['extends/function']},
    'controller/widget/widget.stick': {deps: ['extends/function']},
    'controller/widget/widget.stretch': {deps: ['extends/function']},
    'controller/widget/widget.wireframe': {deps: ['extends/function']},
    'controller/widget/widget.zoom': {deps: ['extends/function']},

    'controller/workspace/workspace.page': {deps: ['extends/function']},
    'controller/workspace/workspace.seo': {deps: ['extends/function']},
    'controller/workspace/workspace.services': {deps: ['extends/function']},

    'controller/application.controller': {deps: ['extends/function']},
    'controller/layout.controller': {deps: ['extends/function']},
    'controller/page.controller': {deps: ['extends/function']},
    'controller/widget.controller': {deps: ['extends/function']},
    'controller/workspace.controller': {deps: ['extends/function']},

    'api/application.api': {deps: ['extends/function']},
    'api/workspace.api': {deps: ['extends/function']},
    'api/page.api': {deps: ['extends/function']},
    'api/widget.api': {deps: ['extends/function']},

    'element/application/application.content.element': {deps: ['extends/function']},
    'element/application/application.element': {deps: ['extends/function']},

    'element/page/page.content.element': {deps: ['extends/function']},
    'element/page/page.delta.scroll.element': {deps: ['extends/function']},
    'element/page/page.element': {deps: ['extends/function']},

    'element/widget/widget.comment.element': {deps: ['extends/function']},
    'element/widget/widget.content.element': {deps: ['extends/function']},
    'element/widget/widget.element': {deps: ['extends/function']},
    'element/widget/widget.expander.element': {deps: ['extends/function']},

    'element/workspace/workspace.content.element': {deps: ['extends/function']},
    'element/workspace/workspace.element': {deps: ['extends/function']},

    'element/button.element': {deps: ['extends/function']},
    'element/cover.element': {deps: ['extends/function']},
    'element/export.element': {deps: ['extends/function']},
    'element/filter.element': {deps: ['extends/function']},
    'element/footer.element': {deps: ['extends/function']},
    'element/header.element': {deps: ['extends/function']},
    'element/modal.element': {deps: ['extends/function']},

    'event/application.event.manager': {deps: ['extends/function']},
    'event/layout.event.manager': {deps: ['extends/function']},
    'event/page.event.manager': {deps: ['extends/function']},
    'event/widget.event.manager': {deps: ['extends/function']},
    'event/workspace.event.manager': {deps: ['extends/function']},

    'modules/base/Array': {deps: ['extends/function']},
    'modules/base/Css': {deps: ['extends/function']},
    'modules/base/DateTime': {deps: ['extends/function']},
    'modules/base/Event': {deps: ['extends/function']},
    'modules/base/File': {deps: ['extends/function']},
    'modules/base/Function': {deps: ['extends/function']},
    'modules/base/Generator': {deps: ['extends/function']},
    'modules/base/Hash': {deps: ['extends/function']},
    'modules/base/HTML': {deps: ['extends/function']},
    'modules/base/Image': {deps: ['extends/function']},
    'modules/base/Number': {deps: ['extends/function']},
    'modules/base/RequirePatch': {deps: ['extends/function']},
    'modules/base/String': {deps: ['extends/function']},
    'modules/base/UA': {deps: ['extends/function']},

    'modules/renderer/check.box': {deps: ['extends/function']},
    'modules/renderer/combo.box': {deps: ['extends/function']},
    'modules/renderer/comments': {deps: ['extends/function']},
    'modules/renderer/embed': {deps: ['extends/function']},
    'modules/renderer/event.link': {deps: ['extends/function']},
    'modules/renderer/fieldset': {deps: ['extends/function']},
    'modules/renderer/filter': {deps: ['extends/function']},
    'modules/renderer/iframe': {deps: ['extends/function']},
    'modules/renderer/label': {deps: ['extends/function']},
    'modules/renderer/number.field': {deps: ['extends/function']},
    'modules/renderer/object': {deps: ['extends/function']},
    'modules/renderer/range': {deps: ['extends/function']},
    'modules/renderer/slider': {deps: ['extends/function']},
    'modules/renderer/source': {deps: ['extends/function']},
    'modules/renderer/tabs': {deps: ['extends/function']},
    'modules/renderer/text.area': {deps: ['extends/function']},
    'modules/renderer/text.download': {deps: ['extends/function']},
    'modules/renderer/text.editor': {deps: ['extends/function']},
    'modules/renderer/text.field': {deps: ['extends/function']},
    'modules/renderer/tool.tip': {deps: ['extends/function']},
    'modules/renderer/upload.on.drop': {deps: ['extends/function']},
    'modules/renderer/validation': {deps: ['extends/function']},

    'modules/API': {deps: ['extends/function']},
    'modules/Base': {deps: ['extends/function']},
    'modules/Controller': {deps: ['extends/function', 'modules/i18n']},
    'modules/CRUD': {deps: ['extends/function']},
    'modules/Element': {deps: ['extends/function']},
    'modules/Event': {deps: ['extends/function']},
    'modules/Geolocation': {deps: ['extends/function']},
    'modules/i18n': {deps: ['extends/function']},
    'modules/Interactions': {deps: ['extends/function']},
    'modules/Logger': {deps: ['extends/function']},
    'modules/Mixin': {deps: ['extends/function']},
    'modules/Model': {deps: ['extends/function', 'modules/i18n']},
    'modules/MVC': {deps: ['extends/function']},
    'modules/Observer': {deps: ['extends/function']},
    'modules/Permission': {deps: ['extends/function']},
    'modules/Preferences': {deps: ['extends/function']},
    'modules/Renderer': {deps: ['extends/function']},
    'modules/Router': {deps: ['extends/function']},
    'modules/Setting': {deps: ['extends/function', 'lz-string']},
    'modules/View': {deps: ['extends/function', 'modules/i18n']},

    'model/application.model': {deps: ['extends/function']},
    'model/page.model': {deps: ['extends/function']},
    'model/widget.model': {deps: ['extends/function']},
    'model/workspace.model': {deps: ['extends/function']},

    'permission/application.permission': {deps: ['extends/function']},
    'permission/layout.permission': {deps: ['extends/function']},
    'permission/page.permission': {deps: ['extends/function']},
    'permission/widget.permission': {deps: ['extends/function']},
    'permission/workspace.permission': {deps: ['extends/function']},

    'view/application.view': {deps: ['extends/function']},
    'view/page.view': {deps: ['extends/function']},
    'view/widget.view': {deps: ['extends/function']},
    'view/workspace.view': {deps: ['extends/function']},

    'plugins/plugin.controller': {deps: ['extends/function']},
    'plugins/plugin.element': {deps: ['extends/function']},

    'services/bigmir.net': {deps: ['extends/function']},
    'services/github.gist': {deps: ['extends/function']},
    'services/google.analytics': {deps: ['extends/function']},
    'services/inject.script': {deps: ['extends/function']},
    'services/raygun.io': {deps: ['extends/function']},
    'services/snap.engage': {deps: ['extends/function']},
    'services/yahoo.flurry': {deps: ['extends/function']}
  }
});
