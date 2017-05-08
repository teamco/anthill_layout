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
], function defineSpankwireModel(BaseModel, WidgetContentModel) {

  /**
   * Define Spankwire model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SpankwireModel
   * @constructor
   */
  var SpankwireModel = function SpankwireModel() {

    /**
     * Define preferences
     * @memberOf SpankwireModel
     * @type {{
         *      spankwireEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      spankwireEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf SpankwireModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SpankwireModel.extend('SpankwireModel', {

    /**
     * Set Spankwire embed code
     * @memberOf SpankwireModel
     * @param {string} embed
     */
    setSpankwireEmbedCode: function setSpankwireEmbedCode(embed) {
      this.setPrefs('spankwireEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
