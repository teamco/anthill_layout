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
], function definePavelModel(BaseModel, WidgetContentModel) {

    /**
     * Define Pavel model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PavelModel
     * @constructor
     */
    var PavelModel = function PavelModel() {

        /**
         * Define preferences
         * @property PavelModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property PavelModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PavelModel.extend('PavelModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
