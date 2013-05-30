/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/5/12
 * Time: 9:17 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/model',
    'modules/base',
    'config/workspace'
], function (BaseModel, Base, Workspace) {

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
    }, BaseModel.prototype, Base);

});