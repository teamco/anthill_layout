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
], function defineEmpflixModel(BaseModel, WidgetContentModel) {

  /**
   * Define Empflix model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class EmpflixModel
   * @constructor
   */
  var EmpflixModel = function EmpflixModel() {

    /**
     * Define preferences
     * @memberOf EmpflixModel
     * @type {{
         *      empflixEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      empflixEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf EmpflixModel
     * @type {{}}
     */
    this.rules = {};
  };

  return EmpflixModel.extend('EmpflixModel', {

    /**
     * Set Empflix embed code
     * @memberOf EmpflixModel
     * @param {string} embed
     */
    setEmpflixEmbedCode: function setEmpflixEmbedCode(embed) {
      this.setPrefs('empflixEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
