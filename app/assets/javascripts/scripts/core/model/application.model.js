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
], function defineAppModel(BaseModel, Setting, Workspace) {

    /**
     * Define Application model
     * @extends BaseModel
     * @class AppModel
     * @constructor
     */
    var AppModel = function AppModel() {

        /**
         * Define item
         * @memberOf AppModel
         * @type {Workspace}
         */
        this.item = Workspace;
    };

    return AppModel.extend('AppModel', {

        /**
         * Define global setting
         * @memberOf AppModel
         */
        defineSetting: function defineSetting() {

            /**
             * Define setting
             * @memberOf AppModel
             * @type {Setting}
             */
            this.setting = new Setting(
                this.scope,
                this.getConfig('appName')
            );

            this.scope.logger.debug('Define setting', this.setting);
        }

    }, BaseModel.prototype);

});