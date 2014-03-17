/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/setting',
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
         * @member AppModel
         * @type {Workspace}
         */
        this.item = Workspace;
    };

    return AppModel.extend('AppModel', {

        /**
         * Define global setting
         * @member AppModel
         */
        defineSetting: function defineSetting() {

            /**
             * Define setting
             * @member AppModel
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