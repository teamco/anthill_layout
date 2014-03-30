/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineYoutubeEventManager(BaseEvent) {

    /**
     * Define Youtube event manager
     * @class YoutubeEventManager
     * @constructor
     * @extends BaseEvent
     */
    var YoutubeEventManager = function YoutubeEventManager() {

        /**
         * Define events
         * @member YoutubeEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member YoutubeEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string,
         *      loadRules: string,
         *      transferRules: string
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
            transferRules: 'transfer.rules'
        };
    };

    return YoutubeEventManager.extend('YoutubeEventManager', {
    }, BaseEvent.prototype);
});