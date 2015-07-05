/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Model',
    'modules/Setting',
    'config/workspace'
], function defineApplicationModel(BaseModel, Setting, Workspace) {

    /**
     * Define Application model
     * @extends BaseModel
     * @class ApplicationModel
     * @constructor
     */
    var ApplicationModel = function ApplicationModel() {

        /**
         * Define item
         * @property ApplicationModel
         * @type {Workspace}
         */
        this.item = Workspace;
    };

    return ApplicationModel.extend('ApplicationModel', {

        /**
         * Define global setting
         * @memberOf ApplicationModel
         */
        initGlobalSetting: function initGlobalSetting() {

            /**
             * Get scope
             * @type {Application}
             */
            var scope = this.scope;

            /**
             * Define setting
             * @memberOf ApplicationModel
             * @type {Setting}
             */
            this.setting = new Setting(
                scope,
                scope.controller.getAppName()
            );

            scope.logger.debug('Define setting', this.setting);
        },

        /**
         * Define load workspaces
         * @memberOf ApplicationModel
         */
        loadWorkspaces: function loadWorkspaces() {

            this.scope.controller.setAsLoading(true);

            /**
             * Get collector
             * @type {object}
             */
            var collector = this.getCollector(this.item);

            return collector ?
                this.loadData(this.item, collector, true) : -1;
        }

    }, BaseModel.prototype);

});