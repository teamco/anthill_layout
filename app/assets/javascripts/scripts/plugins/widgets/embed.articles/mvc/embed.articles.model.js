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
], function defineEmbedArticlesModel(BaseModel, WidgetContentModel) {

  /**
   * Define EmbedArticles model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class EmbedArticlesModel
   * @constructor
   */
  var EmbedArticlesModel = function EmbedArticlesModel() {

    /**
     * Define preferences
     * @property EmbedArticlesModel
     * @type {{embedarticlesEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      embedarticlesEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<a id="embed_articles" href="http://embedarticles.com" data-url="http%3A%2F%2Fyasmincorp.com%2F2015%2F10%2F23%2Fmahasiswa-ipb-ini-yang-harus-kamu-perhatikan-ketika-pertama-kali-beli-rumah%2F" data-key="null">Embed Articles</a><script type="text/javascript" src="//embedarticles.com/widget/embed.js"></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property EmbedArticlesModel
     * @type {{}}
     */
    this.rules = {};
  };

  return EmbedArticlesModel.extend('EmbedArticlesModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
