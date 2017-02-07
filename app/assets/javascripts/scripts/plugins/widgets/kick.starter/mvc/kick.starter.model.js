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
], function defineKickStarterModel(BaseModel, WidgetContentModel) {

  /**
   * Define KickStarter model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class KickStarterModel
   * @constructor
   */
  var KickStarterModel = function KickStarterModel() {

    /**
     * Define preferences
     * @memberOf KickStarterModel
     * @type {{
         *      kickstarterEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      kickstarterEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf KickStarterModel
     * @type {{}}
     */
    this.rules = {};
  };

  return KickStarterModel.extend('KickStarterModel', {

    /**
     * Set KickStarter embed code
     * @memberOf KickStarterModel
     * @param {string} embed
     */
    setKickstarterEmbedCode: function setKickstarterEmbedCode(embed) {
      this.setPrefs('kickstarterEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
