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
], function defineBingMapsModel(BaseModel, WidgetContentModel) {

  /**
   * Define BingMaps model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class BingMapsModel
   * @constructor
   */
  var BingMapsModel = function BingMapsModel() {

    /**
     * Define preferences
     * @property BingMapsModel
     * @type {{}}
     */
    this.preferences = {
      bingmapsKey: {
        type: 'text',
        disabled: false,
        value: 'ApRfAuJzpLlPQKXI43m6NlnhlKlWNyRJxq2MWDKZdWNLDs35QVKrzH3-7jQjlIk9',
        visible: true
      },
      bingmapsMapType: {
        type: 'combobox',
        disabled: false,
        list: [
          {
            type: 'text',
            value: 'Road'
          },
          {
            type: 'text',
            value: 'Aerial'
          },
          {
            type: 'text',
            value: 'StreetSide'
          }
        ],
        value: 'Road',
        visible: true,
        label: true
      },
      bingmapsLatitudeLongitude: {
        type: 'text',
        disabled: false,
        value: '51.50632,-0.12714',
        placeholder: 'Enter location: Latitude,Longitude',
        visible: true
      },
      bingmapsZoom: {
        type: 'number',
        disabled: false,
        value: 10,
        visible: true
      }
    };

    /**
     * Define rules
     * @property BingMapsModel
     * @type {{}}
     */
    this.rules = {};
  };

  return BingMapsModel.extend(
      'BingMapsModel', {},
      BaseModel.prototype,
      WidgetContentModel.prototype
  );
});
