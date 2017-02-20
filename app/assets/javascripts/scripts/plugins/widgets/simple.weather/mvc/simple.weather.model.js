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
], function defineSimpleWeatherModel(BaseModel, WidgetContentModel) {

  /**
   * Define SimpleWeather model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SimpleWeatherModel
   * @constructor
   */
  var SimpleWeatherModel = function SimpleWeatherModel() {

    /**
     * Define preferences
     * @memberOf SimpleWeatherModel
     * @type {{
         * }}
     */
    this.preferences = {
      simpleweatherUnit: {
        type: 'combobox',
        disabled: false,
        list: [
          {
            type: 'text',
            value: 'Celsius'
          },
          {
            type: 'text',
            value: 'Fahrenheit'
          }
        ],
        value: 'Celsius',
        visible: true
      },
      simpleweatherLatitude: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      simpleweatherLongitude: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf SimpleWeatherModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SimpleWeatherModel.extend('SimpleWeatherModel', {

    /**
     * Set Simple weather Latitude
     * @memberOf SimpleWeatherModel
     * @param {number} latitude
     */
    setSimpleweatherLatitude: function setSimpleweatherLatitude(latitude) {
      this.setPrefs('simpleweatherLatitude', latitude);
    },

    /**
     * Set Simple weather Longitude
     * @memberOf SimpleWeatherModel
     * @param {number} longitude
     */
    setSimpleweatherLongitude: function setSimpleweatherLongitude(longitude) {
      this.setPrefs('simpleweatherLongitude', longitude);
    },

    /**
     * Set Simple weather unit
     * @memberOf SimpleWeatherModel
     * @param {string} unit
     */
    setSimpleweatherUnit: function setSimpleweatherUnit(unit) {
      this.setPrefs('simpleweatherUnit', unit);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
