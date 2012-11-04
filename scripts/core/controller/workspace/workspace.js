var Workspace = function Workspace(scope, opts) {

    this.parent = scope;
    this.root = scope;

    var base = this.root.com.base;

    opts = base.define(opts, {}, true);

    // Default constants

    var DEFAULTS = {
        uuid: base.generator.UUID(),
        page: {
            limit: 10,
            order: []
        }

//        header: false,
//        footer: false,
//        flexible: true,
//        showMaximizePanel: true,
//        animate: true,
//        showDebuggerTab: false,
//        saveDelay: 500,
//        pagesDimensionChanged: false,
        //render mathod
//        defaultRender: true,
        // Show first page or last page after load.
        // if false then last page will be shown.
//        showFirstPageOnLoad: true,
//        centralize: {
//            vertical: true,
//            horizontal: true,
//            animate: true,
//            onload: false
//        },
//        permission: {
//            show: true
//        },
//        ,
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
    };

    // Configure workspace
    this.config = base.hash.extendHash(opts, DEFAULTS);


    // Init MVC
    new MVC(this);

    // Init page
    this.page = undefined;
    this.pages = {};

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