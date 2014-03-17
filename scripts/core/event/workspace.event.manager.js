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
     * @extends Event
     */
    var WorkspaceEventManager = function WorkspaceEventManager() {

        /**
         * Define events
         * @member WorkspaceEventManager
         * @type {{}}
         */
        this.events = {};

    };

    return WorkspaceEventManager.extend('WorkspaceEventManager', {

        /**
         * Define event list
         * @member WorkspaceEventManager
         * @type {{
         *      createPage: string,
         *      destroyPage: string,
         *      destroyPages: string,
         *      resizePages: string,
         *      resizePage: string,
         *      setPageContainerHeight: string
         * }}
         */
        eventList: {
            createPage: 'create.page',
            destroyPage: 'destroy.page',
            destroyPages: 'destroy.pages',
            resizePage: 'resize.page',
            resizePages: 'resize.pages',
            setPageContainerHeight: 'set.page.container.height'
        }

    }, Event.prototype);
});