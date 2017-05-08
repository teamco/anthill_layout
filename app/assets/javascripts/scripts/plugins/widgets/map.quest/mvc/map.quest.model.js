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
], function defineMapQuestModel(BaseModel, WidgetContentModel) {

  /**
   * Define MapQuest model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class MapQuestModel
   * @constructor
   */
  var MapQuestModel = function MapQuestModel() {

    /**
     * Define preferences
     * @property MapQuestModel
     * @type {{}}
     */
    this.preferences = {
      mapquestConsumerKey: {
        type: 'text',
        disabled: false,
        value: 'qN2wBoKG2Q6PS6A5ezVpuiJ2GKOIOSbw',
        visible: true
      },
      mapquestLatitudeLongitude: {
        type: 'text',
        disabled: false,
        value: '39.7439,-105.0200',
        placeholder: 'Enter location: Latitude,Longitude',
        visible: true
      },
      mapquestZoomOnDoubleClick: {
        type: 'checkbox',
        disabled: false,
        checked: true,
        visible: true
      },
      mapquestZoom: {
        type: 'number',
        disabled: false,
        value: 10,
        visible: true
      }
    };

    /**
     * Define rules
     * @property MapQuestModel
     * @type {{}}
     */
    this.rules = {};
  };

  return MapQuestModel.extend('MapQuestModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
