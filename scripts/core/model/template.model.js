/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'require',
    'modules/model'
], function defineTemplateModel(require, BaseModel) {

        /**
         * Circular solution require js
         */
        return function getTemplateModel() {

            /**
             * Define Template model
             * @extends BaseModel
             * @class TemplateModel
             * @constructor
             */
            var TemplateModel = function TemplateModel() {

                /**
                 * Define Page item
                 * @type {Page}
                 */
                this.item = require('config/page');
            };

            return TemplateModel.extend('TemplateModel', {
            }, BaseModel.prototype);

        }();
    }
);