/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    "require",
    'modules/model',
    'modules/base'
], function(require, BaseModel, Base) {

        /**
         * Circular solution require js
         */
        return function Model() {

            /**
             * Define Template model
             * @mixin BaseModel
             * @extends Base
             * @class Model
             * @constructor
             */
            var Model = function Model() {

                /**
                 * Define Page item
                 * @type {Page}
                 */
                this.item = require('config/page');
            };

            return Model.extend({
            }, BaseModel.prototype, Base);

        }();
    }
);