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
], function defineBigmirNetModel(BaseModel, WidgetContentModel) {

  /**
   * Define BigmirNet model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class BigmirNetModel
   * @constructor
   */
  var BigmirNetModel = function BigmirNetModel() {

    /**
     * Define preferences
     * @memberOf BigmirNetModel
     * @type {{
         *      bigmirnetEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      bigmirnetEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf BigmirNetModel
     * @type {{}}
     */
    this.rules = {};
  };

  return BigmirNetModel.extend('BigmirNetModel', {

    /**
     * Set BigmirNet embed code
     * @memberOf BigmirNetModel
     * @param {string} embed
     */
    setBigmirnetEmbedCode: function setBigmirnetEmbedCode(embed) {
      this.setPrefs('bigmirnetEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
