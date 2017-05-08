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
], function defineInfogrAmModel(BaseModel, WidgetContentModel) {

  /**
   * Define InfogrAm model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class InfogrAmModel
   * @constructor
   */
  var InfogrAmModel = function InfogrAmModel() {

    /**
     * Define preferences
     * @property InfogrAmModel
     * @type {{infogramEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      infogramEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<script id="infogram_0_eu_fraud_map___international_version" title="Copy: " src="//e.infogr.am/js/embed.js?Tn6" type="text/javascript"></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property InfogrAmModel
     * @type {{}}
     */
    this.rules = {};
  };

  return InfogrAmModel.extend('InfogrAmModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
