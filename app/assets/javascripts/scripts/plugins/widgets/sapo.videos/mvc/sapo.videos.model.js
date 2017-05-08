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
], function defineSapoVideosModel(BaseModel, WidgetContentModel) {

  /**
   * Define SapoVideos model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SapoVideosModel
   * @constructor
   */
  var SapoVideosModel = function SapoVideosModel() {

    /**
     * Define preferences
     * @property SapoVideosModel
     * @type {{sapovideosEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      sapovideosEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe src="http://rd3.videos.sapo.pt/playhtml?file=http://rd3.videos.sapo.pt/wjmdpVtN2JRLBTH1VpSJ/mov/1" frameborder="0" scrolling="no" width="640" height="360" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property SapoVideosModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SapoVideosModel.extend('SapoVideosModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
