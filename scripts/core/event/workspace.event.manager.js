/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineWorkspaceEventManager(Event) {

    /**
     * Define workspace event manager
     * @class EventManager
     * @constructor
     */
    var EventManager = function EventManager() {

        /**
         * Define events
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @type {{
         *      createPage: string,
         *      destroyPage: string,
         *      destroyPages: string,
         *      resizePage: string,
         *      setPageContainerHeight: string
         * }}
         */
        this.eventList = {
            createPage: 'create.page',
            destroyPage: 'destroy.page',
            destroyPages: 'destroy.pages',
            resizePage: 'resize.page',
            resizePages: 'resize.pages',
            setPageContainerHeight: 'set.page.container.height'
        };

    };

    return EventManager.extend({

    }, Event.prototype);
});