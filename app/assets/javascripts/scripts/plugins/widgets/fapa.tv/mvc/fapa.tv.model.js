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
], function defineFapaTvModel(BaseModel, WidgetContentModel) {

  /**
   * Define FapaTv model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FapaTvModel
   * @constructor
   */
  var FapaTvModel = function FapaTvModel() {

    /**
     * Define preferences
     * @property FapaTvModel
     * @type {{
         *      fapatvEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      fapatvEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @property FapaTvModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FapaTvModel.extend('FapaTvModel', {

    /**
     * Set FapaTv embed code
     * @memberOf FapaTvModel
     * @param {string} embed
     */
    setFapatvEmbedCode: function setFapatvEmbedCode(embed) {
      this.setPrefs('fapatvEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
