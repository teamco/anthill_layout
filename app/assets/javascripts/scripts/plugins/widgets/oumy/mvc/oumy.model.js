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
], function defineOumyModel(BaseModel, WidgetContentModel) {

    /**
     * Define Oumy model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OumyModel
     * @constructor
     */
    var OumyModel = function OumyModel() {

        /**
         * Define preferences
         * @property OumyModel
         * @type {{oumyEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            oumyEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe src="https://www.oumy.com/embed/0yqK3Bj5vNt65eII5BtSBl9" width="1024" height="576" scrolling="no" frameborder="1"style="border: 1px solid black;" allowfullscreen></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property OumyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OumyModel.extend('OumyModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
