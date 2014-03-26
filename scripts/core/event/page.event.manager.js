/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function definePageEventManager(BaseEvent) {

    /**
     * Define page event manager
     * @class PageEventManager
     * @constructor
     */
    var PageEventManager = function PageEventManager() {

        /**
         * Define events
         * @member PageEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return PageEventManager.extend('PageEventManager', {

        /**
         * Define event list
         * @member PageEventManager
         * @type {{
         *      createWidget: string,
         *      destroyWidget: string,
         *      destroyWidgets: string,
         *      createTemplate: string,
         *      destroyTemplate: string,
         *      createLayout: string,
         *      destroyLayout: string,
         *      resizeWidgets: string,
         *      resizeWidget: string,
         *      updateHeight: string
         * }}
         */
        eventList: {
            createWidget: 'create.widget',
            destroyWidget: 'destroy.widget',
            destroyWidgets: 'destroy.widgets',
            createTemplate: 'create.template',
            destroyTemplate: 'destroy.template',
            createLayout: 'create.layout',
            destroyLayout: 'destroy.layout',
            resizeWidget: 'resize.widget',
            resizeWidgets: 'resize.widgets',
            updateHeight: 'update.height'
        }

    }, BaseEvent.prototype);
});