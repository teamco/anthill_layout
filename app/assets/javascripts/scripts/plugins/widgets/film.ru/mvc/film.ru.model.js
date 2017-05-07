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
], function defineFilmRuModel(BaseModel, WidgetContentModel) {

  /**
   * Define FilmRu model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class FilmRuModel
   * @constructor
   */
  var FilmRuModel = function FilmRuModel() {

    /**
     * Define preferences
     * @property FilmRuModel
     * @type {{
     *      filmruEmbedCode: {type: string, disabled: boolean, value:
     *     undefined, visible: boolean}
     * }}
     */
    this.preferences = {
      filmruEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe allowfullscreen frameborder="0" width="600" height="418" src="http://www.film.ru/trailer/853707"></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property FilmRuModel
     * @type {{}}
     */
    this.rules = {};
  };

  return FilmRuModel.extend(
      'FilmRuModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
