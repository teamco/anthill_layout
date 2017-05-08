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
], function defineNationalFilmBoardOfCanadaModel(BaseModel,
    WidgetContentModel) {

  /**
   * Define NationalFilmBoardOfCanada model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class NationalFilmBoardOfCanadaModel
   * @constructor
   */
  var NationalFilmBoardOfCanadaModel = function NationalFilmBoardOfCanadaModel() {

    /**
     * Define preferences
     * @property NationalFilmBoardOfCanadaModel
     * @type {{nationalfilmboardofcanadaEmbedCode: {type: string, disabled:
     *     boolean, value: string, visible: boolean}}}
     */
    this.preferences = {
      nationalfilmboardofcanadaEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe src="https://www.nfb.ca/film/nowhere_land/embed/player" width="560" height="315" frameborder="0"></iframe><p style="width:560px"><a href="https://www.nfb.ca/film/nowhere_land" target="_blank"><em>Nowhere Land</em></a> <a href="/explore-all-directors/rosie_bonnie-ammaaq" title="more films by Rosie Bonnie Ammaaq" target="_blank">Rosie Bonnie Ammaaq</a>, <a href="https://www.nfb.ca" target="_blank">National Film Board of Canada</a></p>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property NationalFilmBoardOfCanadaModel
     * @type {{}}
     */
    this.rules = {};
  };

  return NationalFilmBoardOfCanadaModel.extend('NationalFilmBoardOfCanadaModel',
      {

        // Setter

      }, BaseModel.prototype, WidgetContentModel.prototype);
});
