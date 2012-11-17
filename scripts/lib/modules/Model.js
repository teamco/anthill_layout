/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:51 PM
 * To change this template use File | Settings | File Templates.
 */

define(['modules/base'], function initModel(Base) {
    var BaseModel = function BaseModel() {

    };

    return BaseModel.extend({
        getUUID: function getUUID(module) {
            module = this.define(module, {}, true);
            if (module.hasOwnProperty('config')) {
                return module.config.uuid;
            }
        }
    }, Base);

});