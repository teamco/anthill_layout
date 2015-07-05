/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'config/page'
], function defineWorkspaceModel(BaseModel, Page) {

    /**
     * Define Workspace model
     * @extends BaseModel
     * @class WorkspaceModel
     * @constructor
     */
    var WorkspaceModel = function WorkspaceModel() {

        /**
         * Define Page item
         * @property WorkspaceModel
         * @type {Page}
         */
        this.item = Page;

        /**
         * Skip transfer preferences
         * @property WorkspaceModel
         * @type {string[]}
         */
        this.skipPreferencesOn = [
            'cloneItemContent'
        ];
    };

    return WorkspaceModel.extend('WorkspaceModel', {

        /**
         * Set static width
         * @memberOf WorkspaceModel
         * @param {boolean} width
         */
        setStaticWidth: function setStaticWidth(width) {

            // Define config
            var config = this.scope.config;

            config.preferences.staticWidth = width;
            config.isResized = !width;
        },

        /**
         * Set Site Width Slider
         * @memberOf WorkspaceModel
         * @param {number} width
         */
        setSiteWidthSlider: function setSiteWidthSlider(width) {

            this._setItemInfoPreferences('siteWidthSlider', width);

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updatePagesWidth
            );
        },

        /**
         * Set site title
         * @memberOf WorkspaceModel
         * @param {string} title
         */
        setSiteTitle: function setSiteTitle(title) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteTitle', title);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteTitle
            );
        },

        /**
         * Set site author
         * @memberOf WorkspaceModel
         * @param {string} author
         */
        setSiteAuthor: function setSiteAuthor(author) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteAuthor', author);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteAuthor
            );
        },

        /**
         * Set site description
         * @memberOf WorkspaceModel
         * @param {string} description
         */
        setSiteDescription: function setSiteDescription(description) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteDescription', description);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteDescription
            );
        },

        /**
         * Set site keywords
         * @memberOf WorkspaceModel
         * @param {string} keywords
         */
        setSiteKeywords: function setSiteKeywords(keywords) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            this._setItemInfoPreferences('siteKeywords', keywords);

            scope.observer.publish(
                scope.eventmanager.eventList.updateSiteKeywords
            );
        },

        /**
         * Set google analytics tracking id
         * @memberOf WorkspaceModel
         * @param {string} trackingId
         */
        setTrackingId: function setTrackingId(trackingId) {

            /**
             * Set local scope
             * @type {Workspace}
             */
            var scope = this.scope;

            scope.config.preferences.trackingId = trackingId;

            scope.observer.publish(
                scope.eventmanager.eventList.loadTrackingSnippet
            );
        },

        /**
         * Define clone item content
         * @memberOf WorkspaceModel
         * @param {string} itemUUID
         */
        setCloneItemContent: function setCloneItemContent(itemUUID) {

            /**
             * Get scope
             * @type {Workspace}
             */
            var scope = this.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.clonePage,
                itemUUID
            );
        },

        /**
         * Define load pages
         * @memberOf WorkspaceModel
         */
        loadPages: function loadPages() {

            // Define local scope
            var scope = this.scope,
                base = this.base;

            scope.controller.setAsLoading(true);

            /**
             * Set data
             * @type {object}
             */
            var data = this.getCollector(),
                lname = this.item.name.toLowerCase(),
                collector = base.define(data.collector, {}, true);

            this.loadData(lname, collector[lname]);
        }

    }, BaseModel.prototype);
});