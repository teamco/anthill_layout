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
], function defineDotsubModel(BaseModel, WidgetContentModel) {

    /**
     * Define Dotsub model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class DotsubModel
     * @constructor
     */
    var DotsubModel = function DotsubModel() {

        /**
         * Define preferences
         * @property DotsubModel
         * @type {{}}
         */
        this.preferences = {
            dotsubEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://dotsub.com/media/38b2f41f-485c-4545-b52b-d12da58a4c1c/embed/" frameborder="0" width="640" height="360" AllowFullScreen></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property DotsubModel
         * @type {{}}
         */
        this.rules = {};
    };

    return DotsubModel.extend('DotsubModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
