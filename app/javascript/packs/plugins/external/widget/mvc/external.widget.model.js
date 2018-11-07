/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
defineP([
  'modules/Model',
  'plugins/widgets/widget.content.model'
], function defineExternalWidgetModel(BaseModel, WidgetContentModel) {

  /**
   * Define ExternalWidget model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ExternalWidgetModel
   * @constructor
   */
  var ExternalWidgetModel = function ExternalWidgetModel() {

    /**
     * Define preferences
     * @property ExternalWidgetModel
     * @type {{}}
     */
    this.preferences = {};

    /**
     * Define rules
     * @property ExternalWidgetModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ExternalWidgetModel.extend(
      'ExternalWidgetModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});