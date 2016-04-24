/**
 * Created with RubyMine.
 * User: teamco
 * Date: 2/23/14
 * Time: 11:02 AM
 */

define([
    'config/anthill',
    'modules/MVC',
    'plugins/widgets/facebook.embedded.posts/mvc/facebook.embedded.posts.controller',
    'plugins/widgets/facebook.embedded.posts/mvc/facebook.embedded.posts.model',
    'plugins/widgets/facebook.embedded.posts/mvc/facebook.embedded.posts.view',
    'plugins/widgets/facebook.embedded.posts/mvc/facebook.embedded.posts.event.manager',
    'plugins/widgets/facebook.embedded.posts/mvc/facebook.embedded.posts.permission'
], function defineFacebookEmbeddedPosts(AntHill, MVC, Controller, Model, View, EventManager, Permission) {

    /**
     * Define FacebookEmbeddedPosts
     * @param containment
     * @param [opts]
     * @constructor
     * @class FacebookEmbeddedPosts
     * @extends AntHill
     */
    var FacebookEmbeddedPosts = function FacebookEmbeddedPosts(containment, opts) {

        /**
         * Define containment
         * @property FacebookEmbeddedPosts
         */
        this.containment = containment;

        /**
         * Define referrer
         * @property FacebookEmbeddedPosts
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
         * @property FacebookEmbeddedPosts
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

    return FacebookEmbeddedPosts.extend('FacebookEmbeddedPosts', {}, AntHill.prototype);
});
