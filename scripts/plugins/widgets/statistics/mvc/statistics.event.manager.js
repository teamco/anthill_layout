/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineStatisticsEventManager(BaseEvent) {

    /**
     * Define Statistics event manager
     * @class StatisticsEventManager
     * @constructor
     * @extends BaseEvent
     */
    var StatisticsEventManager = function StatisticsEventManager() {

        /**
         * Define events
         * @member StatisticsEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member StatisticsEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      defineReferrer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            defineReferrer: 'define.referrer',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences'
        };
    };

    return StatisticsEventManager.extend('StatisticsEventManager', {
    }, BaseEvent.prototype);
});