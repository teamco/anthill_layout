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
], function defineFilmOnModel(BaseModel, WidgetContentModel) {

  /**
   * Define FilmOn model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FilmOnModel
   * @constructor
   */
  var FilmOnModel = function FilmOnModel() {

    /**
     * Define preferences
     * @property FilmOnModel
     * @type {{filmonChannelId: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}}}
     */
    this.preferences = {
      filmonChannelId: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @property FilmOnModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FilmOnModel.extend('FilmOnModel', {

    /**
     * Set FilmOn Url
     * @memberOf FilmOnModel
     * @param {number} channel
     */
    setFilmonChannelId: function setFilmonChannelId(channel) {
      this.setPrefs('filmonChannelId', channel);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
