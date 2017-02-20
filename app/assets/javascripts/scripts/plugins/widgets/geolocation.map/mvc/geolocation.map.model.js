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
], function defineGeolocationMapModel(BaseModel, WidgetContentModel) {

  /**
   * Define GeolocationMap model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class GeolocationMapModel
   * @constructor
   */
  let GeolocationMapModel = function GeolocationMapModel() {

    /**
     * Define preferences
     * @memberOf GeolocationMapModel
     * @type {{
     *      geolocationmapAPIKey: {type: string, disabled: boolean, value:
     *     string, visible: boolean}, geolocationmapLatitude: {type:
     *     string, disabled: boolean, value: undefined, visible: boolean},
     *     geolocationmapLongitude: {type: string, disabled: boolean,
     *     value: undefined, visible: boolean}, geolocationmapZoom: {type:
     *     string, disabled: boolean, value: number, visible: boolean},
     *     geolocationmapWidth: {type: string, disabled: boolean, value:
     *     number, visible: boolean}, geolocationmapHeight: {type: string,
     *     disabled: boolean, value: number, visible: boolean},
     *     geolocationmapMapType: { type: string, disabled: boolean, list:
     *     {type: string, value: string}[], value: string, visible: boolean
     *      },
     *      geolocationmapGpsSensor: {type: string, disabled: boolean,
     *     value: boolean, visible: boolean}, geolocationmapScale: {type:
     *     string, disabled: boolean, value: boolean, visible: boolean},
     *     geolocationmapStretch: {type: string, disabled: boolean, value:
     *     boolean, visible: boolean}
     * }}
     */
    this.preferences = {
      geolocationmapAPIKey: {
        type: 'text',
        disabled: true,
        value: 'AIzaSyA0-az3dp57YDXEvMT-d7TmK1nh-sSbbDs',
        visible: true
      },
      geolocationmapLatitude: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      geolocationmapLongitude: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: true
      },
      geolocationmapZoom: {
        type: 'text',
        disabled: false,
        value: 14,
        visible: true
      },
      geolocationmapWidth: {
        type: 'text',
        disabled: false,
        value: 400,
        visible: true
      },
      geolocationmapHeight: {
        type: 'text',
        disabled: false,
        value: 300,
        visible: true
      },
      geolocationmapMapType: {
        type: 'combobox',
        disabled: false,
        list: [
          {
            type: 'text',
            value: 'Roadmap'
          },
          {
            type: 'text',
            value: 'Satellite'
          },
          {
            type: 'text',
            value: 'Terrain'
          },
          {
            type: 'text',
            value: 'Hybrid'
          }
        ],
        value: 'Roadmap',
        visible: true,
        label: true
      },
      geolocationmapGpsSensor: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true
      },
      geolocationmapScale: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true
      },
      geolocationmapStretch: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true
      }
    };

    /**
     * Define rules
     * @memberOf GeolocationMapModel
     * @type {{}}
     */
    this.rules = {};
  };

  return GeolocationMapModel.extend('GeolocationMapModel', {

    /**
     * Set GeolocationMap Latitude
     * @memberOf GeolocationMapModel
     * @param {number} latitude
     */
    setGeolocationMapLatitude: function setGeolocationMapLatitude(latitude) {
      this.setPrefs('geolocationmapLatitude', latitude);
    },

    /**
     * Set GeolocationMap Longitude
     * @memberOf GeolocationMapModel
     * @param {number} longitude
     */
    setGeolocationMapLongitude: function setGeolocationMapLongitude(longitude) {
      this.setPrefs('geolocationmapLongitude', longitude);
    },

    /**
     * Set GeolocationMap Zoom
     * @memberOf GeolocationMapModel
     * @param {number} zoom
     */
    setGeolocationMapZoom: function setGeolocationMapZoom(zoom) {
      this.setPrefs('geolocationmapZoom', zoom);
    },

    /**
     * Set GeolocationMap Width
     * @memberOf GeolocationMapModel
     * @param {number} width
     */
    setGeolocationMapWidth: function setGeolocationMapWidth(width) {
      this.setPrefs('geolocationmapWidth', width);
    },

    /**
     * Set GeolocationMap Height
     * @memberOf GeolocationMapModel
     * @param {number} height
     */
    setGeolocationMapHeight: function setGeolocationMapHeight(height) {
      this.setPrefs('geolocationmapHeight', height);
    },

    /**
     * Set GeolocationMap Height
     * @memberOf GeolocationMapModel
     * @param {string} type
     */
    setGeolocationMapType: function setGeolocationMapType(type) {
      this.setPrefs('geolocationmapMapType', type);
    },

    /**
     * Set GeolocationMap Scale
     * @memberOf GeolocationMapModel
     * @param {boolean} scale
     */
    setGeolocationMapScale: function setGeolocationMapScale(scale) {
      this.setPrefs('geolocationmapScale', scale);
    },

    /**
     * Set GeolocationMap Sensor
     * @memberOf GeolocationMapModel
     * @param {boolean} sensor
     */
    setGeolocationMapGpsSensor: function setGeolocationMapGpsSensor(sensor) {
      this.setPrefs('geolocationmapGpsSensor', sensor);
    },

    /**
     * Set GeolocationMap Stretch
     * @memberOf GeolocationMapModel
     * @param {boolean} stretch
     */
    setGeolocationMapStretch: function setGeolocationMapStretch(stretch) {
      this.setPrefs('geolocationmapStretch', stretch);
    }

  }, BaseModel.prototype, WidgetContentModel.prototype);
});