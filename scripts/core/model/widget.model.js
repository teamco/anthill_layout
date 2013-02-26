/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model',
    'modules/base'
], function defineWidgetModel(BaseModel, Base) {
    var Model = function Model() {
    };

    return Model.extend({
        save: function save() {
            this.scope.dom = this.scope.map.getDOM();
        }

    }, BaseModel.prototype, Base);
});