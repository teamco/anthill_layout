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
], function defineFacilityModel(BaseModel, WidgetContentModel) {

    /**
     * Define Facility model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class FacilityModel
     * @constructor
     */
    var FacilityModel = function FacilityModel() {

        /**
         * Define preferences
         * @property FacilityModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property FacilityModel
         * @type {{}}
         */
        this.rules = {};
    };

    return FacilityModel.extend('FacilityModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
