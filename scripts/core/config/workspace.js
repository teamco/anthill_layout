define([
    'modules/base',
    'modules/mvc',
    'controller/workspace.controller',
    'model/workspace.model',
    'view/workspace.view',
    'event/workspace.event.manager'
], function defineWorkspace(Base, MVC, Controller, Model, View, EventManager) {

    /**
     * Define Workspace
     * @param opts
     * @constructor
     */
    var Workspace = function Workspace(opts) {

        // Default constants
        var DEFAULTS = {
            order: 1,
            page: {
                counter: 0,
                limit: 10,
                // Show previous page
                onDestroyShowPrevious: true
            },
            html: {
                header: false,
                footer: false,
                stretch: true,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
            //        flexible: true,
            //        showMaximizePanel: true,
            //        animate: true,
            //        showDebuggerTab: false,
            //        saveDelay: 500,
            //        pagesDimensionChanged: false,
            //render method
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

        // Init MVC
        new MVC({
            scope: this,
            config: [opts, DEFAULTS],
            components: [
                Controller,
                Model,
                View,
                EventManager
            ]
        });

        /**
         * Define page
         * @type {{}}
         */
        this.page = {};
        this.items = {};

        this.observer.publish(this.eventmanager.eventList.successCreated);

    };

    return Workspace.extend(Base);

});