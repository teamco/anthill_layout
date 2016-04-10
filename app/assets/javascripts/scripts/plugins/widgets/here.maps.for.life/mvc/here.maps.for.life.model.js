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
         * @type {{}}
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
                value: true,
                checked: true,
                visible: true,
                monitor: {
                    events: ['click.toggle'],
                    callback: 'toggleSpecifiedLocation'
                }
            },
            heremapsforlifeViewBounds: {
                type: 'checkbox',
                disabled: true,
                value: false,
                visible: true,
                monitor: {
                    events: ['click.toggle'],
                    callback: 'toggleViewBounds'
                }
            },
            heremapsforlifeLatitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            heremapsforlifeLongitude: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            heremapsforlifeBoundNorthWestCorner: {
                type: 'text',
                disabled: true,
                value: undefined,
                visible: false
            },
            heremapsforlifeBoundSouthEastCorner: {
                type: 'text',
                disabled: true,
                value: undefined,
                visible: false
            },
            heremapsforlifeZoom: {
                type: 'number',
                disabled: true,
                value: 11,
                visible: true
            },
            heremapsforlifeVenuesLayer: {
                type: 'checkbox',
                disabled: true,
                value: false,
                visible: true
            },
            heremapsforlifeRestrictMovement: {
                type: 'checkbox',
                disabled: true,
                value: false,
                visible: true,
                monitor: {
                    events: ['click.toggle'],
                    callback: 'toggleViewBounds'
                }
            },
            heremapsforlifeMarker: {
                type: 'checkbox',
                disabled: true,
                value: false,
                visible: true,
                monitor: {
                    events: ['click.toggle'],
                    callback: 'toggleSpecifiedLocation'
                }
            },
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
