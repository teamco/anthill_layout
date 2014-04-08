/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineGeolocationEventManager(BaseEvent) {

    /**
     * Define Geolocation event manager
     * @class GeolocationEventManager
     * @constructor
     * @extends BaseEvent
     */
    var GeolocationEventManager = function GeolocationEventManager() {

        /**
         * Define events
         * @member GeolocationEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member GeolocationEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      loadRules: string,
         *      publishRule: string,
         *      registerRules: string,
         *      transferRules: string,
         *      getLocation: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            defineReferrer: 'define.referrer',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences',
            loadRules: 'load.rules',
            publishRule: 'publish.rule',
            registerRules: 'register.rules',
            transferRules: 'transfer.rules',
            getLocation: 'get.location'
        };
    };

    return GeolocationEventManager.extend('GeolocationEventManager', {

    }, BaseEvent.prototype);
});