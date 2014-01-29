/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/model',
    'config/widget'
], function definePageModel(BaseModel, Widget) {

    /**
     * Define Page model
     * @mixin BaseModel
     * @class Model
     * @constructor
     */
    var Model = function Model() {

        /**
         * Define item
         * @type {Widget}
         */
        this.item = Widget;

        /**
         * Define on destroy dependencies
         * @type {Array}
         */
        this.onDestroy = [
            'Layout',
            'Template'
        ];
    };

    return Model.extend({

    }, BaseModel.prototype);
});