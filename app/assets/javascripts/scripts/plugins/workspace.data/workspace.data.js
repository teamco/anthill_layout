/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/workspace.data/mvc/workspace.data.controller',
    'plugins/workspace.data/mvc/workspace.data.model',
    'plugins/workspace.data/mvc/workspace.data.view',
    'plugins/workspace.data/mvc/workspace.data.event.manager',
    'plugins/workspace.data/mvc/workspace.data.permission'
], function defineWorkspaceData(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define WorkspaceData
     * @constructor
     * @param containment
     * @class WorkspaceData
     * @extends AntHill
     */
    var WorkspaceData = function WorkspaceData(containment) {

        /**
         * Define containment
         * @member WorkspaceData
         */
        this.containment = containment;

        /**
         * Define active content
         * @member WorkspaceData
         * @type {Page}
         */
        this.activeContent = undefined;

        /**
         * Allow to locate element
         * @member WorkspaceData
         * @type {boolean}
         */
        this.allowToLocate = true;

        /**
         * Define defaults
         * @type {{
         *      plugin: boolean,
         *      html: {
         *          style: string,
         *          header: boolean,
         *          footer: boolean,
         *          floating: boolean,
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      }
         * }}
         */
        var DEFAULTS = {
            plugin: true,
            html: {
                style: 'default',
                header: true,
                footer: true,
                floating: true,
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        };

        /**
         * Define MVC
         * @member WorkspaceData
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [DEFAULTS],
            components: [
                Controller,
                Model,
                View,
                EventManager,
                Permission
            ],
            render: true
        });

        this.observer.publish(
            this.eventmanager.eventList.successCreated
        );

        this.observer.publish(
            this.eventmanager.eventList.updateTranslations,
            ['plugins/workspace.data/translations/en-us']
        );
    };

    return WorkspaceData.extend('WorkspaceData', {

    }, AntHill.prototype);
});