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
    'config/page'
], function defineWorkspaceModel(BaseModel, Base, Page) {

    var Model = function Model() {
        this.item = Page;
    };

    return Model.extend({

    }, BaseModel.prototype, Base);

});