/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/post.tool/mvc/post.tool.controller',
    'plugins/widgets/post.tool/mvc/post.tool.model',
    'plugins/widgets/post.tool/mvc/post.tool.view',
    'plugins/widgets/post.tool/mvc/post.tool.event.manager',
    'plugins/widgets/post.tool/mvc/post.tool.permission'
], function definePostTool(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define PostTool
     * @param containment
     * @param [opts]
     * @constructor
     * @class PostTool
     * @extends AntHill
     */
    var PostTool = function PostTool(containment, opts) {

        /**
         * Define containment
         * @member PostTool
         */
        this.containment = containment;

        /**
         * Define referrer
         * @member PostTool
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
         * Init observer
         * @member PostTool
         * @type {Observer}
         */
        this.observer = undefined;

        /**
         * Init event manager
         * @member PostTool
         * @type {EventManager}
         */
        this.eventmanager = undefined;

        /**
         * Init config
         * @member PostTool
         * @type {*}
         */
        this.config = undefined;

        /**
         * Init model
         * @member PostTool
         * @type {*}
         */
        this.model = undefined;

        /**
         * Define MVC
         * @member PostTool
         * @type {MVC}
         */
        this.mvc = new MVC({
            scope: this,
            config: [
                {
                    uuid: [
                        this.containment.model.getUUID(),
                        this.constructor.name.toDash()
                    ].join('')
                },
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

    return PostTool.extend('PostTool', {

    }, AntHill.prototype);
});