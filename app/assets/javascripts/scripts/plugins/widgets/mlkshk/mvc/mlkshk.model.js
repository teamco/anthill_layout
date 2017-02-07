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
], function defineMlkshkModel(BaseModel, WidgetContentModel) {

  /**
   * Define Mlkshk model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class MlkshkModel
   * @constructor
   */
  var MlkshkModel = function MlkshkModel() {

    /**
     * Define preferences
     * @memberOf MlkshkModel
     * @type {{
         *      mlkshkEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      mlkshkEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf MlkshkModel
     * @type {{}}
     */
    this.rules = {};
  };

  return MlkshkModel.extend('MlkshkModel', {

    /**
     * Set Mlkshk embed code
     * @memberOf MlkshkModel
     * @param {string} embed
     */
    setMlkshkEmbedCode: function setMlkshkEmbedCode(embed) {
      this.setPrefs('mlkshkEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
