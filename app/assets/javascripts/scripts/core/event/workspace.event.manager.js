/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */

define(
    ['modules/Event'],

    /**
     * Define WorkspaceEventManager
     * @param {BaseEvent} BaseEvent
     * @returns {*}
     */
        function defineWorkspaceEventManager(BaseEvent) {

        /**
         * Define workspace event manager
         * @class EventManager
         * @constructor
         * @extends BaseEvent
         */
        var WorkspaceEventManager = function WorkspaceEventManager() {

            /**
             * Define events
             * @property WorkspaceEventManager
             * @type {{}}
             */
            this.events = {};
        };

        return WorkspaceEventManager.extend('WorkspaceEventManager', {

            /**
             * Define event list
             * @property WorkspaceEventManager
             * @type {{
             *      bindHashChange: string,
             *      createPage: string,
             *      destroyPage: string,
             *      destroyPages: string,
             *      resizePages: string,
             *      resizePage: string,
             *      setPageContainerDimensions: string,
             *      updatePagesWidth: string,
             *      beforeSwitchToPage: string,
             *      switchToPage: string,
             *      afterSwitchToPage: string,
             *      adoptContentWidth: string,
             *      afterLoadingItems: string,
             *      updateSiteTitle: string,
             *      updateSiteAuthor: string,
             *      updateSiteDescription: string,
             *      updateSiteKeywords: string,
             *      updateMetaData: string,
             *      updateSiteWidth: string,
             *      loadTrackingSnippet: string,
             *      loadPreferences: string,
             *      transferPreferences: string,
             *      transferContentPreferences: string,
             *      afterUpdatePreferences: string,
             *      createDesignTimePanel: string,
             *      createRunTimePanel: string,
             *      clonePage: string
             * }}
             */
            eventList: {
                bindHashChange: 'bind.hash.change',
                createPage: 'create.page',
                destroyPage: 'destroy.page',
                destroyPages: 'destroy.pages',
                resizePage: 'resize.page',
                resizePages: 'resize.pages',
                setPageContainerDimensions: 'set.page.container.dimensions',
                updatePagesWidth: 'update.pages.width',

                beforeSwitchToPage: 'before.switch.to.page',
                switchToPage: 'switch.to.page',
                afterSwitchToPage: 'after.switch.to.page',
                afterPageOrder: 'after.page.order',

                adoptContentWidth: 'adopt.content.width',

                afterLoadingItems: 'after.loading.items',

                updateSiteWidth: 'update.site.width',

                updateSiteTitle: 'update.site.title',
                updateSiteAuthor: 'update.site.author',
                updateSiteDescription: 'update.site.description',
                updateSiteKeywords: 'update.site.keywords',
                updateMetaData: 'update.meta.data',

                loadTrackingSnippet: 'load.tracking.snippet',

                loadPreferences: 'load.preferences',
                transferPreferences: 'transfer.preferences',
                transferContentPreferences: 'transfer.content.preferences',
                afterUpdatePreferences: 'after.update.preferences',

                createDesignTimePanel: 'create.design.time.panel',
                createRunTimePanel: 'create.run.time.panel',

                clonePage: 'clone.page'
            }

        }, BaseEvent.prototype);
    }
);