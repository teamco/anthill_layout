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
], function defineMetamorphicModel(BaseModel, WidgetContentModel) {

    /**
     * Define Metamorphic model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class MetamorphicModel
     * @constructor
     */
    var MetamorphicModel = function MetamorphicModel() {

        /**
         * Define preferences
         * @property MetamorphicModel
         * @type {{}}
         */
        this.preferences = {};

        /**
         * Define rules
         * @property MetamorphicModel
         * @type {{}}
         */
        this.rules = {};

        if (!Object.keys(this.preferences).length) {

            /**
             * Fetch prefs
             * @type {*|{metamorphicAllowChangeContent, metamorphicType}|{}}
             */
            this.preferences = this.getMetamorphicPreferences(false);
        }
    };

    return MetamorphicModel.extend(
        'MetamorphicModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
