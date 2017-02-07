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
], function defineAnimotoModel(BaseModel, WidgetContentModel) {

  /**
   * Define Animoto model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class AnimotoModel
   * @constructor
   */
  var AnimotoModel = function AnimotoModel() {

    /**
     * Define preferences
     * @property AnimotoModel
     * @type {{
         *      animotoEmbedCode: {type: string, disabled: boolean, value:
         *     undefined, visible: boolean}
         * }}
     */
    this.preferences = {
      animotoEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<iframe id="vp1mbx6U" title="Video Player" width="432" height="243" frameborder="0" src="https://s3.amazonaws.com/embed.animoto.com/play.html?w=swf/production/vp1&e=1461759555&f=mbx6UfXcwzRhyxGbQ0vARA&d=0&m=b&r=360p&volume=100&start_res=360p&i=m&asset_domain=s3-p.animoto.com&animoto_domain=animoto.com&options=" allowfullscreen></iframe><p><a href="https://animoto.com/play/mbx6UfXcwzRhyxGbQ0vARA">Алиса. Творчество</a></p>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property AnimotoModel
     * @type {{}}
     */
    this.rules = {};
  };

  return AnimotoModel.extend('AnimotoModel', {

    /**
     * Set Animoto Url
     * @memberOf AnimotoModel
     * @param {string} embed
     */
    setAnimotoEmbedCode: function setAnimotoEmbedCode(embed) {
      this.setPrefs('animotoEmbedCode', embed);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
