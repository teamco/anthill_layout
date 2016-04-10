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
], function defineHereMapsForLifeModel(BaseModel, WidgetContentModel) {

    /**
     * Define HereMapsForLife model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class HereMapsForLifeModel
     * @constructor
     */
    var HereMapsForLifeModel = function HereMapsForLifeModel() {

        /**
         * Define preferences
         * @property HereMapsForLifeModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property HereMapsForLifeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return HereMapsForLifeModel.extend('HereMapsForLifeModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
