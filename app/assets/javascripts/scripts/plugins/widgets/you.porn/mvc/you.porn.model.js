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
], function defineYouPornModel(BaseModel, WidgetContentModel) {

  /**
   * Define YouPorn model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class YouPornModel
   * @constructor
   */
  var YouPornModel = function YouPornModel() {

    /**
     * Define preferences
     * @memberOf YouPornModel
     * @type {{
         *      youpornEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      youpornEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf YouPornModel
     * @type {{}}
     */
    this.rules = {};
  };

  return YouPornModel.extend('YouPornModel', {

    /**
     * Set YouPorn embed code
     * @memberOf YouPornModel
     * @param {string} embed
     */
    setYoupornEmbedCode: function setYoupornEmbedCode(embed) {
      this.setPrefs('youpornEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
