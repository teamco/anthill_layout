/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineOpenWeatherMapEventManager(BaseEvent) {

    /**
     * Define OpenWeatherMap event manager
     * @class OpenWeatherMapEventManager
     * @constructor
     * @extends BaseEvent
     */
    var OpenWeatherMapEventManager = function OpenWeatherMapEventManager() {

        /**
         * Define events
         * @member OpenWeatherMapEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member OpenWeatherMapEventManager
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

    return OpenWeatherMapEventManager.extend('OpenWeatherMapEventManager', {

    }, BaseEvent.prototype);
});