/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineImageEventManager(Event) {

    /**
     * Define Image event manager
     * @class ImageEventManager
     * @constructor
     * @extends Event
     */
    var ImageEventManager = function ImageEventManager() {

        /**
         * Define events
         * @member ImageEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member ImageEventManager
         * @type {{
         *      initWidget: string,
         *      updateTranslations: string,
         *      defineContainer: string,
         *      setEmbeddedContent: string,
         *      loadPreferences: string,
         *      transferPreferences: string
         * }}
         */
        this.eventList = {
            initWidget: 'init.widget',
            updateTranslations: 'update.translations',
            defineContainer: 'define.container',
            setEmbeddedContent: 'set.embedded.content',
            loadPreferences: 'load.preferences',
            transferPreferences: 'transfer.preferences'
        };
    };

    return ImageEventManager.extend('ImageEventManager', {
    }, Event.prototype);
});