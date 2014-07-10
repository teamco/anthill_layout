/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineSitePreferencesEventManager(BaseEvent) {

    /**
     * Define site event manager
     * @class SitePreferencesEventManager
     * @constructor
     * @extends BaseEvent
     */
    var SitePreferencesEventManager = function SitePreferencesEventManager() {

        /**
         * Define events
         * @member SitePreferencesEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member SitePreferencesEventManager
         * @type {{
         *      updateTranslations: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations'
        };
    };

    return SitePreferencesEventManager.extend('SitePreferencesEventManager', {

    }, BaseEvent.prototype);
});