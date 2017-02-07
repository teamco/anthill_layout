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
], function defineSpeakerDeckModel(BaseModel, WidgetContentModel) {

  /**
   * Define SpeakerDeck model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class SpeakerDeckModel
   * @constructor
   */
  var SpeakerDeckModel = function SpeakerDeckModel() {

    /**
     * Define preferences
     * @property SpeakerDeckModel
     * @type {{speakerdeckEmbedCode: {type: string, disabled: boolean, value:
     *     string, visible: boolean}}}
     */
    this.preferences = {
      speakerdeckEmbedCode: {
        type: 'textarea',
        disabled: false,
        value: '<script async class="speakerdeck-embed" data-id="50021f75cf1db900020005e7" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>',
        visible: true
      }
    };

    /**
     * Define rules
     * @property SpeakerDeckModel
     * @type {{}}
     */
    this.rules = {};
  };

  return SpeakerDeckModel.extend('SpeakerDeckModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
