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
], function defineSlideShareModel(BaseModel, WidgetContentModel) {

  /**
   * Define SlideShare model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SlideShareModel
   * @constructor
   */
  var SlideShareModel = function SlideShareModel() {

    /**
     * Define preferences
     * @memberOf SlideShareModel
     * @type {{}}
     */
    this.preferences = {
      slideshareEmbed: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf SlideShareModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SlideShareModel.extend('SlideShareModel', {

    /**
     * Set embed code
     * @memberOf SlideShareModel
     * @param {string} embed
     */
    setSlideshareEmbed: function setSlideshareEmbed(embed) {
      this.setPrefs('slideshareEmbed', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
