/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'modules/Model',
    'plugins/widgets/widget.content.model'
], function definePetradarModel(BaseModel, WidgetContentModel) {

    /**
     * Define Petradar model
     * @extends BaseModel
     * @class PetradarModel
     * @constructor
     */
    var PetradarModel = function PetradarModel() {

        /**
         * Define preferences
         * @member PetradarModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @member PetradarModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PetradarModel.extend('PetradarModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});