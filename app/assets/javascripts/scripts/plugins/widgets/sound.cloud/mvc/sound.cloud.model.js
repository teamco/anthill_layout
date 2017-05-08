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
], function defineSoundCloudModel(BaseModel, WidgetContentModel) {

  /**
   * Define SoundCloud model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SoundCloudModel
   * @constructor
   */
  var SoundCloudModel = function SoundCloudModel() {

    /**
     * Define preferences
     * @memberOf SoundCloudModel
     * @type {{
         *      soundcloudEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      soundcloudEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf SoundCloudModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SoundCloudModel.extend('SoundCloudModel', {

    /**
     * Set SoundCloud embed code
     * @memberOf SoundCloudModel
     * @param {string} embed
     */
    setSoundcloudEmbedCode: function setSoundcloudEmbedCode(embed) {
      this.setPrefs('soundcloudEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
