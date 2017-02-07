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
], function defineAccuweatherWidgetModel(BaseModel, WidgetContentModel) {

  /**
   * Define AccuweatherWidget model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class AccuweatherWidgetModel
   * @constructor
   */
  var AccuweatherWidgetModel = function AccuweatherWidgetModel() {

    /**
     * Define preferences
     * @property AccuweatherWidgetModel
     * @type {{accuweatherwidgetHtmlCode: {type: string, disabled: boolean,
     *     value: string, visible: boolean}}}
     */
    this.preferences = {
      accuweatherwidgetHtmlCode: {
        type: 'textarea',
        disabled: false,
        value: '<a href="http://www.accuweather.com/en/ge/tbilisi/171705/weather-forecast/171705" class="aw-widget-legal"></a><div id="awcc1470320423854" class="aw-widget-current"  data-locationkey="" data-unit="f" data-language="en-us" data-useip="true" data-uid="awcc1470320423854"></div><script type="text/javascript" src="http://oap.accuweather.com/launch.js"></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property AccuweatherWidgetModel
     * @type {{}}
     */
    this.rules = {};
  };

  return AccuweatherWidgetModel.extend('AccuweatherWidgetModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
