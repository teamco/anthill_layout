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
], function defineRevisionModel(BaseModel, WidgetContentModel) {

  /**
   * Define Revision model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class RevisionModel
   * @constructor
   */
  var RevisionModel = function RevisionModel() {

    /**
     * Define preferences
     * @memberOf RevisionModel
     * @type {{
         *      revisionEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      revisionEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf RevisionModel
     * @type {{}}
     */
    this.rules = {};
  };

  return RevisionModel.extend('RevisionModel', {

    /**
     * Set Revision embed code
     * @memberOf RevisionModel
     * @param {string} embed
     */
    setRevisionEmbedCode: function setRevisionEmbedCode(embed) {
      this.setPrefs('revisionEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
