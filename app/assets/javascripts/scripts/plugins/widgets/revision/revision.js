/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/revision/mvc/revision.controller',
    'plugins/widgets/revision/mvc/revision.model',
    'plugins/widgets/revision/mvc/revision.view',
    'plugins/widgets/revision/mvc/revision.event.manager',
    'plugins/widgets/revision/mvc/revision.permission'
], function defineRevision(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define Revision
     * @param containment
     * @param [opts]
     * @constructor
     * @class Revision
     * @extends AntHill
     */
    var Revision = function Revision(containment, opts) {

        /**
         * Define containment
         * @memberOf Revision
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf Revision
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
         *          padding: {
         *              top: number,
         *              right: number,
         *              bottom: number,
         *              left: number
         *          }
         *      },
         *      regex: RegExp,
         *      mask: string
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
         * @memberOf Revision
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
            this.eventManager.eventList.initWidget,
            opts
        );
    };

    return Revision.extend('Revision', {

    }, AntHill.prototype);
});
