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
        return function Model() {
            var Model = function Model() {
                this.item = require('config/page');
            };

            return Model.extend({
            }, BaseModel.prototype, Base);

        }();
    }
);