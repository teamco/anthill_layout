/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Event'
], function defineSiteConfigEventManager(BaseEvent) {

    /**
     * Define SiteConfig event manager
     * @class SiteConfigEventManager
     * @constructor
     * @extends BaseEvent
     */
    var SiteConfigEventManager = function SiteConfigEventManager() {

        /**
         * Define events
         * @memberOf SiteConfigEventManager
         * @type {{}}
         */
        this.events = {};

        /**
         * Set subscribed flag
         * @memberOf SiteConfigEventManager
         * @type {boolean}
         */
        this.subscribed = false;
    };

    return SiteConfigEventManager.extend('SiteConfigEventManager', {

        /**
         * Define event list
         * @memberOf SiteConfigEventManager
         * @type {{
         *      updateTranslations: string,
         *      loadModuleContent: string,
         *      cleanUpLocalStorage: string,
         *      importSiteData: string,
         *      approveImportSiteData: string,
         *      readyToImportSiteData: string,
         *      exportSiteData: string,
         *      loadSitePreferences: string,
         *      widgetGenerator: string,
         *      widgetEditor: string,
         *      setRoutes: string,
         *      activateStorage: string,
         *      publishStorage: string
         * }}
         */
        eventList: {
            updateTranslations: 'update.translations',
            loadModuleContent: 'load.module.content',
            cleanUpLocalStorage: 'clean.up.local.storage',
            importSiteData: 'import.site.data',
            approveImportSiteData: 'approve.import.site.data',
            readyToImportSiteData: 'ready.to.import.site.data',
            exportSiteData: 'export.site.data',
            loadSitePreferences: 'load.site.preferences',
            widgetGenerator: 'widget.generator',
            widgetEditor: 'widget.editor',
            setRoutes: 'set.routes',
            activateStorage: 'activate.storage',
            publishStorage: 'publish.storage'
        },

        /**
         * Subscribe publish on
         * @memberOf SiteConfigEventManager
         * @param {Application} root
         * @param {Function} [callback]
         * @returns {{}}
         */
        subscribePublishOn: function subscribePublishOn(root, callback) {

            if (this.subscribed) {
                this.scope.logger.debug(
                    'Events already subscribed',
                    arguments
                );
                return false;
            }

            /**
             * Set subscribed flag
             * @memberOf SiteConfigEventManager
             * @type {boolean}
             */
            this.subscribed = true;

            /**
             * Define event list
             * @type {*}
             */
            var rootEventList = root.eventmanager.eventList;

            /**
             * Define events
             * @type {{scope: Page, events: {eventName: string}[], callback: Function}}
             */
            var publish = {
                scope: root,
                events: [
                    {eventName: rootEventList.afterUpdateStorage}
                ],
                callback: callback
            };

            this.publishOn(publish);
        }

    }, BaseEvent.prototype);
});