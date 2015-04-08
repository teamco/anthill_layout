/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/post.template/mvc/post.template.controller',
    'plugins/widgets/post.template/mvc/post.template.model',
    'plugins/widgets/post.template/mvc/post.template.view',
    'plugins/widgets/post.template/mvc/post.template.event.manager',
    'plugins/widgets/post.template/mvc/post.template.permission'
], function definePostTemplate(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PostTemplate
     * @param containment
     * @param [opts]
     * @constructor
     * @class PostTemplate
     * @extends AntHill
     */
    var PostTemplate = function PostTemplate(containment, opts) {

        /**
         * Define containment
         * @memberOf PostTemplate
         */
        this.containment = containment;

        /**
         * Define referrer
         * @memberOf PostTemplate
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
         * @memberOf PostTemplate
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

    return PostTemplate.extend('PostTemplate', {

    }, AntHill.prototype);
});