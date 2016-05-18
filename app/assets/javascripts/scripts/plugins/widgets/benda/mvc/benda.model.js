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
], function defineBendaModel(BaseModel, WidgetContentModel) {

    /**
     * Define Benda model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class BendaModel
     * @constructor
     */
    var BendaModel = function BendaModel() {

        /**
         * Define preferences
         * @property BendaModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property BendaModel
         * @type {{}}
         */
        this.rules = {};
    };

    return BendaModel.extend('BendaModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
