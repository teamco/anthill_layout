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
], function defineReleasewireModel(BaseModel, WidgetContentModel) {

  /**
   * Define Releasewire model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class ReleasewireModel
   * @constructor
   */
  var ReleasewireModel = function ReleasewireModel() {

    /**
     * Define preferences
     * @property ReleasewireModel
     * @type {{releasewireEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      releasewireEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<a class="rwp-pr" href="http://rwire.com/684985">Another American Hero Discarded, SSG Lewis Foutch</a><script>!function(){var e="rwp-platform";if(!document.getElementById(e)){var t=document.createElement("script");t.id=e,t.src=("https:"===document.location.protocol?"https":"http")+"://publisher.releasewire.com/embed.js",t.async=!0,document.body.appendChild(t)}}();</script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property ReleasewireModel
     * @type {{}}
     */
    this.rules = {};
  };

  return ReleasewireModel.extend('ReleasewireModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
