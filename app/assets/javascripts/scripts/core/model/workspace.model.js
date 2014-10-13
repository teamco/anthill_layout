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
        }

    }, BaseModel.prototype);
});