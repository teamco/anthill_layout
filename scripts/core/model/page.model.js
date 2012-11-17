/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:11 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/base'
], function definePageModel(BaseModel, Base) {
    var Model = function Model() {

    };

    return Model.extend(BaseModel.prototype, Base);
});