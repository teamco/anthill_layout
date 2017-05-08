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
], function defineWeatherUndergroundModel(BaseModel, WidgetContentModel) {

  /**
   * Define WeatherUnderground model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class WeatherUndergroundModel
   * @constructor
   */
  var WeatherUndergroundModel = function WeatherUndergroundModel() {

    /**
     * Define preferences
     * @property WeatherUndergroundModel
     * @type {{weatherundergroundHtmlCode: {type: string, disabled: boolean,
     *     value: string, visible: boolean}}}
     */
    this.preferences = {
      weatherundergroundHtmlCode: {
        type: 'textarea',
        disabled: false,
        value: '<span style="display: block !important; width: 180px; text-align: center; font-family: sans-serif; font-size: 12px;"><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:94114.1.99999&bannertypeclick=wu_travel_runway1" title="San Francisco, California Weather Forecast" target="_blank"><img src="http://weathersticker.wunderground.com/weathersticker/cgi-bin/banner/ban/wxBanner?bannertype=wu_travel_runway1_metric&airportcode=KSFO&ForcedCity=San Francisco&ForcedState=CA&zip=94114&language=EN" alt="Find more about Weather in San Francisco, CA" width="160" /></a><br><a href="http://www.wunderground.com/cgi-bin/findweather/getForecast?query=zmw:94114.1.99999&bannertypeclick=wu_travel_runway1" title="Get latest Weather Forecast updates" style="font-family: sans-serif; font-size: 12px" target="_blank">Click for weather forecast</a></span>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property WeatherUndergroundModel
     * @type {{}}
     */
    this.rules = {};
  };

  return WeatherUndergroundModel.extend('WeatherUndergroundModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
