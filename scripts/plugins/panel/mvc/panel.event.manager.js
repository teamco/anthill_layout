/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function definePanelEventManager(Event) {

    /**
     * Define layout event manager
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
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            showContent: 'show.content',
            defineModules: 'define.modules',
            openPanel: 'open.panel',
            closePanel: 'close.panel'
        };
    };

    return EventManager.extend({
    }, Event.prototype);
});