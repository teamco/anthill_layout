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
         * @memberOf WorkspaceModel
         * @type {Page}
         */
        this.item = Page;
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
            this.scope.config.preferences.siteWidthSlider = width;
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

            this.scope.config.preferences.trackingId = trackingId;

            this.scope
        }

    }, BaseModel.prototype);
});