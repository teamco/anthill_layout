/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineSiteEventManager(BaseEvent) {

    /**
     * Define site event manager
     * @class SiteEventManager
     * @constructor
     * @extends BaseEvent
     */
    var SiteEventManager = function SiteEventManager() {

        /**
         * Define events
         * @member SiteEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member SiteEventManager
         * @type {{
         *      updateTranslations: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations'
        };
    };

    return SiteEventManager.extend('SiteEventManager', {

    }, BaseEvent.prototype);
});