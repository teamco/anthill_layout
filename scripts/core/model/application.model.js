/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'config/setting',
    'config/workspace'
], function (BaseModel, Setting, Workspace) {

    /**
     * Define Application model
     * @mixin BaseModel
     * @extends Base
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Define item
         * @type {Workspace}
         */
        this.item = Workspace;
    };

    return Model.extend({

        /**
         * Define global setting
         */
        defineSetting: function defineSetting() {

            /**
             * Define setting
             * @type {config.setting}
             */
            this.setting = new Setting(
                this.scope.controller.getMode(),
                this.getConfig('appName')
            );

            this.scope.logger.debug('Define setting', this.setting);
        }

    }, BaseModel.prototype);

});