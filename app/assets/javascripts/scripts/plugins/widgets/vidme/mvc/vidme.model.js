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
], function defineVidmeModel(BaseModel, WidgetContentModel) {

    /**
     * Define Vidme model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VidmeModel
     * @constructor
     */
    var VidmeModel = function VidmeModel() {

        /**
         * Define preferences
         * @memberOf VidmeModel
         * @type {{
         *      vidmeEmbedCode: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            vidmeEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://vid.me/e/txgR?stats=1" width="854" height="480" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf VidmeModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VidmeModel.extend('VidmeModel', {

        /**
         * Set Vidme embed code
         * @memberOf VidmeModel
         * @param {string} embed
         */
        setVidmeEmbedCode: function setVidmeEmbedCode(embed) {
            this.setPrefs('vidmeEmbedCode', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
