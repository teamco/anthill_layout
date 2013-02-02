/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model',
    'modules/base',
    'config/widget'
], function definePageModel(BaseModel, Base, Widget) {
    var Model = function Model() {
        this.item = Widget;
        this.onDestroy = [
            'destroyLayout'
        ];
    };

    return Model.extend({

    }, BaseModel.prototype, Base);
});