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
], function defineCoubModel(BaseModel, WidgetContentModel) {

    /**
     * Define Coub model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class CoubModel
     * @constructor
     */
    var CoubModel = function CoubModel() {

        /**
         * Define preferences
         * @memberOf CoubModel
         * @type {{
         *      coubLink: {type: string, disabled: boolean, value: undefined, visible: boolean},
         *      coubAutoStart: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      coubMute: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      coubHideTopBar: {type: string, disabled: boolean, value: boolean, visible: boolean},
         *      coubStartWithHighDefinition: {type: string, disabled: boolean, value: boolean, visible: boolean}
         * }}
         */
        this.preferences = {
            coubLink: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            coubAutoStart: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            coubMute: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            coubHideTopBar: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            coubStartWithHighDefinition: {
                type: 'checkbox',
                disabled: false,
                value: true,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf CoubModel
         * @type {{}}
         */
        this.rules = {};
    };

    return CoubModel.extend('CoubModel', {

        /**
         * Set link
         * @memberOf CoubModel
         * @param {string} link
         */
        setCoubLink: function setCoubLink(link) {
            this.setPrefs('coubLink', link);
        },

        /**
         * Set auto start
         * @memberOf CoubModel
         * @param {boolean} start
         */
        setCoubAutoStart: function setCoubAutoStart(start) {
            this.setPrefs('coubAutoStart', start);
        },

        /**
         * Set mute
         * @memberOf CoubModel
         * @param {boolean} mute
         */
        setCoubMute: function setCoubMute(mute) {
            this.setPrefs('coubMute', mute);
        },

        /**
         * Set hide top bar
         * @memberOf CoubModel
         * @param {boolean} hide
         */
        setCoubHideTopBar: function setCoubHideTopBar(hide) {
            this.setPrefs('coubHideTopBar', hide);
        },

        /**
         * Set start with hd
         * @memberOf CoubModel
         * @param {boolean} hd
         */
        setCoubStartWithHighDefinition: function setCoubStartWithHighDefinition(hd) {
            this.setPrefs('coubStartWithHighDefinition', hd);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
