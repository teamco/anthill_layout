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

    /**
     * Define Widget model
     * @mixin BaseModel
     * @extends Base
     * @class Model
     * @constructor
     */
    var Model = function Model() {
    };

    return Model.extend({

        /**
         * Save
         */
        save: function save() {

            /**
             * Update DOM
             * @type {*}
             */
            this.scope.dom = this.scope.map.getDOM();
        }

    }, BaseModel.prototype, Base);
});