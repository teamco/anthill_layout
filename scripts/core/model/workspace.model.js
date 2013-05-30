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

    /**
     * Define Workspace model
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
        this.item = Page;
    };

    return Model.extend({

    }, BaseModel.prototype, Base);

});