/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineBarEventManager(BaseEvent) {

    /**
     * Define bar event manager
     * @class BarEventManager
     * @constructor
     * @extends BaseEvent
     */
    var BarEventManager = function BarEventManager() {

        /**
         * Define events
         * @type {{}}
         * @memberOf BarEventManager
         */
        this.events = {};

        /**
         * Define event list
         * @memberOf BarEventManager
         * @type {{
         *      updateTranslations: string,
         *      showContent: string,
         *      defineModules: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            showContent: 'show.content',
            defineModules: 'define.modules'
        };
    };

    return BarEventManager.extend('BarEventManager', {
    }, BaseEvent.prototype);
});