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
], function defineVideopressModel(BaseModel, WidgetContentModel) {

    /**
     * Define Videopress model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VideopressModel
     * @constructor
     */
    var VideopressModel = function VideopressModel() {

        /**
         * Define preferences
         * @property VideopressModel
         * @type {{
         *      videopressEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}
         * }}
         */
        this.preferences = {
            videopressEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe width="560" height="315" src="https://videopress.com/embed/kUJmAcSf" frameborder="0" allowfullscreen></iframe><script src="https://videopress.com/videopress-iframe.js"></script>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property VideopressModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VideopressModel.extend('VideopressModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
