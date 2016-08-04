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
], function defineForecastIoModel(BaseModel, WidgetContentModel) {

    /**
     * Define ForecastIo model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ForecastIoModel
     * @constructor
     */
    var ForecastIoModel = function ForecastIoModel() {

        /**
         * Define preferences
         * @property ForecastIoModel
         * @type {{}}
         */
        this.preferences = {
            forecastioEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=42.3583&lon=-71.0603&name=Downtown Boston"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property ForecastIoModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ForecastIoModel.extend('ForecastIoModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
