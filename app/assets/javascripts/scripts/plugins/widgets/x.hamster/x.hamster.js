/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/x.hamster/mvc/x.hamster.controller',
    'plugins/widgets/x.hamster/mvc/x.hamster.model',
    'plugins/widgets/x.hamster/mvc/x.hamster.view',
    'plugins/widgets/x.hamster/mvc/x.hamster.event.manager',
    'plugins/widgets/x.hamster/mvc/x.hamster.permission'
], function defineXHamster(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define XHamster
     * @param containment
     * @param [opts]
     * @constructor
     * @class XHamster
     * @extends AntHill
     */
    var XHamster = function XHamster(containment, opts) {

        /**
         * Define containment
         * @member XHamster
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member XHamster
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
            },
            regex: /\d+/,
            mask: '<iframe src="http://xhamster.com/xembed.php?video={id}" frameborder="0" width="100%" height="100%" scrolling="no" allowtransparency="true" webkitAllowFullScreen mozallowfullscreen allowfullscreen>'
        };

        /**
         * Define MVC
         * @member XHamster
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

    return XHamster.extend('XHamster', {

    }, AntHill.prototype);
});
