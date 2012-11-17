/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/mvc',
    'controller/page/page.controller',
    'model/page.model'
], function definePage(Base, MVC, Controller, Model) {
    var Page = function Page(opts) {

        opts = this.base.define(opts, {}, true);

        var uuid = this.base.isDefined(opts.uuid) ?
            opts.uuid :
            this.base.lib.generator.UUID();

        this.widgets = {};
        this.widget = {};
        this.collector = {};
        this.maximized = {};

        this.widgetCounter = 0;

        var DEFAULTS = {
            uuid: uuid,
            namespace: this.constructor.getConstructorName()
//            layout: {}
//            groupOut: false,
//            dimensionChanged: false,
//            delayOfDestroyDom: 100,
//            allowToAddWidgets: true,
//            allowMaximize: true,
//            permission: opts.permission,
//            Show previous page
//            onDestroyShowNextPage: false,
//            widget: {
//                globalListeners: []
//            },
//            menu: {
//                capability: App.permissionManager.capabilities.page.menu,
//                items: {
//                    rename: {
//                        title: App.i18n("page.menu.rename"),
//                        separator: false,
//                        callback: 'rename',
//                        capability: App.permissionManager.capabilities.page.rename
//                    },
//                    destroy: {
//                        title: App.i18n("page.menu.destroy"),
//                        separator: true,
//                        callback: 'destroy',
//                        capability: App.permissionManager.capabilities.page.destroy
//                    }
//                }
//            }
        };

        // Configure page
        this.config = this.base.lib.hash.extendHash(opts, DEFAULTS);

        // Init MVC
        // Init MVC
        new MVC({
            scope: this,
            components: [Controller, Model]
        });

//        this.layout = this.model.setLayout();

//        this.createWidget = this.model.createWidget;
//        this.current = this.workspace.controller.getCurrentPage;
//
//        this.view.render();

        // Hide all pages instead of this
//        this.workspace.controller.showCurrentPage(this);

    };

    return Page.extend(Base);
});
