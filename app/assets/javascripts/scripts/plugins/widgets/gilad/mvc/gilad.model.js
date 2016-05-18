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
], function defineGiladModel(BaseModel, WidgetContentModel) {

    /**
     * Define Gilad model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class GiladModel
     * @constructor
     */
    var GiladModel = function GiladModel() {

        /**
         * Define preferences
         * @property GiladModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property GiladModel
         * @type {{}}
         */
        this.rules = {};
    };

    return GiladModel.extend('GiladModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
