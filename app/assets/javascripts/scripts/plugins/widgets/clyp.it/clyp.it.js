/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/clyp.it/mvc/clyp.it.controller',
    'plugins/widgets/clyp.it/mvc/clyp.it.model',
    'plugins/widgets/clyp.it/mvc/clyp.it.view',
    'plugins/widgets/clyp.it/mvc/clyp.it.event.manager',
    'plugins/widgets/clyp.it/mvc/clyp.it.permission'
], function defineClypIt(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define ClypIt
     * @param containment
     * @param [opts]
     * @constructor
     * @class ClypIt
     * @extends AntHill
     */
    var ClypIt = function ClypIt(containment, opts) {

        /**
         * Define containment
         * @property ClypIt
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property ClypIt
         * @type {*}
         */
        this.referrer = undefined;

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
                header: false,
                footer: false,
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
         * @property ClypIt
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {uuid: this.containment.model.getContentUUID()},
                DEFAULTS
            ],
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
            this.eventmanager.eventList.initWidget,
            opts
        );
    };

    return ClypIt.extend('ClypIt', {}, AntHill.prototype);
});
