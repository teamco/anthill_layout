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
], function defineHereMapsForLifeModel(BaseModel, WidgetContentModel) {

  /**
   * Define HereMapsForLife model
   * @extends BaseModel
   * @extends WidgetContentModel
   * @class HereMapsForLifeModel
   * @constructor
   */
  var HereMapsForLifeModel = function HereMapsForLifeModel() {

    /**
     * Define preferences
     * @property HereMapsForLifeModel
     * @type {{
         *      heremapsforlifeAppId: {type: string, disabled: boolean, value:
         *     string, visible: boolean},  heremapsforlifeAppCode: {type:
         *     string, disabled: boolean, value: string, visible: boolean},
         *     heremapsforlifeSpecifiedLocation: {type: string, disabled:
         *     boolean, value: boolean, visible: boolean, monitor: {events:
         *     string[], callback: string}},  heremapsforlifeViewBounds: {type:
         *     string, disabled: boolean, value: boolean, visible: boolean,
         *     monitor: {events: string[], callback: string}},
         *     heremapsforlifeVenuesLayer: {type: string, disabled: boolean,
         *     value: boolean, visible: boolean},
         *     heremapsforlifeRestrictMovement: {type: string, disabled: boolean, value: boolean, visible: boolean, monitor: {events: string[], callback: string}},  heremapsforlifeMarker: {type: string, disabled: boolean, value: boolean, visible: boolean, monitor: {events: string[], callback: string}},  heremapsforlifeDraggableMarker: {type: string, disabled: boolean, value: boolean, visible: boolean},  heremapsforlifeTerrainMap: {type: string, disabled: boolean, value: boolean, visible: boolean},  heremapsforlifeZoom: {type: string, disabled: boolean, value: number, visible: boolean},  heremapsforlifeLatitudeLongitude: {type: string, disabled: boolean, value: undefined, visible: boolean, placeholder: string},  heremapsforlifeLocationMarker: {type: string, disabled: boolean, value: undefined, visible: boolean, placeholder: string},  heremapsforlifeNWSECorners: {type: string, disabled: boolean, value: undefined, visible: boolean, placeholder: string},  heremapsforlifeRestrictBounds: {type: string, disabled: boolean, value: undefined, visible: boolean, placeholder: string}
         * }}
     */
    this.preferences = {
      heremapsforlifeAppId: {
        type: 'text',
        disabled: false,
        value: 'SjmKip4mygk3QhmWerKm',
        visible: true
      },
      heremapsforlifeAppCode: {
        type: 'text',
        disabled: false,
        value: 'l1Y3ajdv_7K9KMgrvT6iHA',
        visible: true
      },
      heremapsforlifeSpecifiedLocation: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true,
        monitor: {
          events: ['click.toggle'],
          callback: 'toggleSpecifiedLocation'
        }
      },
      heremapsforlifeViewBounds: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true,
        monitor: {
          events: ['click.toggle'],
          callback: 'toggleViewBounds'
        }
      },
      heremapsforlifeVenuesLayer: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true
      },
      heremapsforlifeRestrictMovement: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true,
        monitor: {
          events: ['click.toggle'],
          callback: 'toggleBoundsRestrict'
        }
      },
      heremapsforlifeMarker: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true,
        monitor: {
          events: ['click.toggle'],
          callback: 'toggleSpecifiedLocationMarker'
        }
      },
      heremapsforlifeDraggableMarker: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true
      },
      heremapsforlifeTerrainMap: {
        type: 'checkbox',
        disabled: false,
        value: false,
        visible: true
      },
      heremapsforlifeZoom: {
        type: 'number',
        disabled: false,
        value: 11,
        visible: true
      },
      heremapsforlifeLatitudeLongitude: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false,
        placeholder: 'Map at a specified location: Latitude,Longitude'
      },
      heremapsforlifeLocationMarker: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false,
        placeholder: 'Marker on the Map: [Latitude,Longitude],[...],..'
      },
      heremapsforlifeNWSECorners: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false,
        placeholder: 'Map using View Bounds: North,West,South,East corners'
      },
      heremapsforlifeRestrictBounds: {
        type: 'text',
        disabled: false,
        value: undefined,
        visible: false,
        placeholder: 'Restrict Map Movement: North,West,South,East corners'
      }
    };

    /**
     * Define rules
     * @property HereMapsForLifeModel
     * @type {{}}
     */
    this.rules = {};
  };

  return HereMapsForLifeModel.extend('HereMapsForLifeModel', {

    // Setter

  }, BaseModel.prototype, WidgetContentModel.prototype);
});
