/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineRssEventManager(BaseEvent) {

    /**
     * Define Rss event manager
     * @class RssEventManager
     * @constructor
     * @extends BaseEvent
     */
    var RssEventManager = function RssEventManager() {

        /**
         * Define events
         * @member RssEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member RssEventManager
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
         *      parseRSS: string
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
            parseRSS: 'parse.rss'
        };
    };

    return RssEventManager.extend('RssEventManager', {

    }, BaseEvent.prototype);
});