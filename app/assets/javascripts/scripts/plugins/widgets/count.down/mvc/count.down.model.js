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
], function defineCountDownModel(BaseModel, WidgetContentModel) {

  /**
   * Define CountDown model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class CountDownModel
   * @constructor
   */
  var CountDownModel = function CountDownModel() {

    /**
     * Define preferences
     * @property CountDownModel
     * @type {{}}
     */
    this.preferences = {
      // Preferences
    };

    /**
     * Define rules
     * @property CountDownModel
     * @type {{}}
     */
    this.rules = {};
  };

  return CountDownModel.extend('CountDownModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
