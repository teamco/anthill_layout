/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:27 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineAppEventManager(BaseEvent) {

    /**
     * Define template event manager
     * @class EventManager
     * @constructor
     * @extends BaseEvent
     */
    var TemplateEventManager = function TemplateEventManager() {

        /**
         * Define events
         * @member TemplateEventManager
         * @type {{}}
         */
        this.events = {};
    };

    return TemplateEventManager.extend('TemplateEventManager', {

        /**
         * Define event list
         * @member TemplateEventManager
         * @type {{
         *      createPage: string,
         *      destroyPage: string,
         *      destroyPages: string,
         *      createWidget: string,
         *      destroyWidget: string,
         *      destroyWidgets: string
         * }}
         */
        eventList: {
            createPage: 'create.page',
            destroyPage: 'destroy.page',
            destroyPages: 'destroy.pages',
            createWidget: 'create.widget',
            destroyWidget: 'destroy.widget',
            destroyWidgets: 'destroy.widgets'
        }

    }, BaseEvent.prototype);
});