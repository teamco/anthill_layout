var Workspace = function Workspace(scope, opts) {

    this.scope = scope;

    opts = App.base.define(opts, {});
//
//    // Default constants
//    var DEFAULTS = {
//        uuid: App.base.createUUID(),
//        header: false,
//        footer: false,
//        flexible: true,
//        showMaximizePanel: true,
//        animate: true,
//        showDebuggerTab: false,
//        saveDelay: 500,
//        pagesDimensionChanged: false,
//        //render mathod
//        defaultRender: true,
//        // Show first page or last page after load.
//        // if false then last page will be shown.
//        showFirstPageOnLoad: true,
//        centralize: {
//            vertical: true,
//            horizontal: true,
//            animate: true,
//            onload: false
//        },
//        panel: {
//            top: {
//                allowed: false,
//                html: '',
//                style: 'outer'
//            },
//            right: {
//                allowed: false,
//                html: '',
//                style: 'outer'
//            },
//            bottom: {
//                allowed: false,
//                html: '',
//                style: 'inner'
//            },
//            left: {
//                allowed: false,
//                html: '',
//                style: 'inner'
//            }
//        },
//        permission: {
//            show: true
//        },
//        log: {
//            mode: 'development',
//            development: true,
//            debug: false,
//            show: false,
//            cover: false,
//            namespace: false,
//            type: {
//                debug: false,
//                log: false,
//                info: false,
//                error: true,
//                warn: true
//            }
//        },
//        page: {
//            limit: 10
//        },
//        gallery: {
//            singleton: true,
//            style: 'top closed',
//            // This is the jQuery search string to find the container of the gallery
//            container: '#workspacePanel',
//            append: false,
//            fadeOnDrag: true,
//            fadeOnResize: true,
//            fadeOnStartGalleryDrag: true,
//            panelHeight: 220
//        }
//    };
//
//    // Configure workspace
//    this.config = App.config.init(opts, DEFAULTS);
//
//    // Init MVC
//    jQuery.extend(this, new App.config.MVC({
//        scope: this
//    }));
//
//    // Init page
//    this.pages = {};
//    this.pagesOrder = [];

//    this.observer.fireEvent(
//        this.eventManager.eventList.beforeInitialized, [
//            'Workspace loading configuration',
//            opts
//        ]
//    );
//
//    this.observer.fireEvent(
//        this.eventManager.eventList.afterInitialized, [
//            'Workspace initialized',
//            this.controller.getConfig()
//        ]
//    );
//
//    this.observer.fireEvent(
//        this.eventManager.eventList.onLoadData,
//        this.controller.getConfig('data')
//    );

};