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
         * @member WorkspaceModel
         * @type {Page}
         */
        this.item = Page;

        /**
         * Skip transfer preferences
         * @member WorkspaceModel
         * @type {string[]}
         */
        this.skipPreferencesOn = [
            'cloneItemContent'
        ];
    };

    return WorkspaceModel.extend('WorkspaceModel', {

        /**
         * Set static width
         * @member WorkspaceModel
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
         * @member WorkspaceModel
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
         * @member WorkspaceModel
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
         * @member WorkspaceModel
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
         * @member WorkspaceModel
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
         * @member WorkspaceModel
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
         * @member WorkspaceModel
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
         * @member WorkspaceModel
         * @param {string} itemUUID
         */
        setCloneItemContent: function setCloneItemContent(itemUUID) {

            var clone = this.getItemByUUID(itemUUID),
                currentItem = this.getCurrentItem();


        }

    }, BaseModel.prototype);
});