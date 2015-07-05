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

            return collector[lname] ?
                this.loadData(lname, collector[lname], true) : -1;
        }

    }, BaseModel.prototype);

});