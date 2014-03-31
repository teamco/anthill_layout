/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/event'
], function defineImageGalleryEventManager(BaseEvent) {

    /**
     * Define ImageGallery event manager
     * @class ImageGalleryEventManager
     * @constructor
     * @extends BaseEvent
     */
    var ImageGalleryEventManager = function ImageGalleryEventManager() {

        /**
         * Define events
         * @member ImageGalleryEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @member ImageGalleryEventManager
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
            publishRule: 'publish.rule',
            transferRules: 'transfer.rules'
        };
    };

    return ImageGalleryEventManager.extend('ImageGalleryEventManager', {
    }, BaseEvent.prototype);
});