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
        this.preferences = {
            metamorphicAllowChangeContent: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            metamorphicType: {
                type: 'listbox',
                disabled: false,
                list: [],
                visible: true,
                label: true
            }
        };

        /**
         * Define rules
         * @property MetamorphicModel
         * @type {{}}
         */
        this.rules = {};
    };

    return MetamorphicModel.extend('MetamorphicModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
