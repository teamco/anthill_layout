/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/twenty.four.video/mvc/twenty.four.video.controller',
    'plugins/widgets/twenty.four.video/mvc/twenty.four.video.model',
    'plugins/widgets/twenty.four.video/mvc/twenty.four.video.view',
    'plugins/widgets/twenty.four.video/mvc/twenty.four.video.event.manager',
    'plugins/widgets/twenty.four.video/mvc/twenty.four.video.permission'
], function defineTwentyFourVideo(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define TwentyFourVideo
     * @param containment
     * @param [opts]
     * @constructor
     * @class TwentyFourVideo
     * @extends AntHill
     */
    var TwentyFourVideo = function TwentyFourVideo(containment, opts) {

        /**
         * Define containment
         * @memberOf TwentyFourVideo
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf TwentyFourVideo
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
         * @memberOf TwentyFourVideo
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

    return TwentyFourVideo.extend('TwentyFourVideo', {

    }, AntHill.prototype);
});
