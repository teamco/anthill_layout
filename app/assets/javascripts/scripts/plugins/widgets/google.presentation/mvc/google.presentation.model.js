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
], function defineGooglePresentationModel(BaseModel, WidgetContentModel) {

  /**
   * Define GooglePresentation model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class GooglePresentationModel
   * @constructor
   */
  var GooglePresentationModel = function GooglePresentationModel() {

    /**
     * Define preferences
     * @memberOf GooglePresentationModel
     * @type {{
     *      googlepresentationEmbed: {type: string, disabled: boolean,
     *     value: undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      googlepresentationEmbed: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf GooglePresentationModel
     * @type {{}}
     */
    this.rules = {};
  };

  return GooglePresentationModel.extend('GooglePresentationModel', {

    /**
     * Set embed
     * @memberOf GooglePresentationModel
     * @param {string} embed
     */
    setGooglepresentationEmbed: function setGooglepresentationEmbed(embed) {
      this.setPrefs('googlepresentationEmbed', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
