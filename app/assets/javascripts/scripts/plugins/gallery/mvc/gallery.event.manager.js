/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineGalleryEventManager(BaseEvent) {

    /**
     * Define Gallery event manager
     * @class GalleryEventManager
     * @constructor
     * @extends BaseEvent
     */
    var GalleryEventManager = function GalleryEventManager() {

        /**
         * Define events
         * @memberOf GalleryEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Define event list
         * @memberOf GalleryEventManager
         * @type {{
         *      updateTranslations: string,
         *      setProviders: string,
         *      loadContent: string
         * }}
         */
        this.eventList = {
            updateTranslations: 'update.translations',
            loadContent: 'load.content',
            setProviders: 'set.providers',
            setCurrentProvider: 'set.current.provider'
        };
    };

    return GalleryEventManager.extend('GalleryEventManager', {
    }, BaseEvent.prototype);
});