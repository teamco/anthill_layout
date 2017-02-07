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
], function defineKeezMoviesModel(BaseModel, WidgetContentModel) {

  /**
   * Define KeezMovies model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class KeezMoviesModel
   * @constructor
   */
  var KeezMoviesModel = function KeezMoviesModel() {

    /**
     * Define preferences
     * @memberOf KeezMoviesModel
     * @type {{
         *      keezmoviesEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      keezmoviesEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: undefined,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf KeezMoviesModel
     * @type {{}}
     */
    this.rules = {};
  };

  return KeezMoviesModel.extend('KeezMoviesModel', {

    /**
     * Set KeezMovies embed code
     * @memberOf KeezMoviesModel
     * @param {string} embed
     */
    setKeezmoviesEmbedCode: function setKeezmoviesEmbedCode(embed) {
      this.setPrefs('keezmoviesEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
