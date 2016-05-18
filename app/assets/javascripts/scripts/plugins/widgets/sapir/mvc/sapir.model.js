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
], function defineSapirModel(BaseModel, WidgetContentModel) {

    /**
     * Define Sapir model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class SapirModel
     * @constructor
     */
    var SapirModel = function SapirModel() {

        /**
         * Define preferences
         * @property SapirModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property SapirModel
         * @type {{}}
         */
        this.rules = {};
    };

    return SapirModel.extend('SapirModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
