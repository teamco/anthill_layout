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

        this.widgets = {};
        this.widget = {};
        this.collector = {};
        this.maximized = {};

        var DEFAULTS = {
            counter: 0,
            order: 1,
            default: false,
            layout: {
                overlapping: true,
                emptySpaces: true
            },
            widget: {
                counter: 0,
                allowToAdd: true
            },
            html: {
                header: false,
                footer: false
            }
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
