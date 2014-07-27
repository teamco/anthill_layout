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
            this.scope.config.preferences.siteWidthSlider = width;
        }

    }, BaseModel.prototype);
});