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
], function defineShowTheWayModel(BaseModel, WidgetContentModel) {

    /**
     * Define ShowTheWay model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ShowTheWayModel
     * @constructor
     */
    var ShowTheWayModel = function ShowTheWayModel() {

        /**
         * Define preferences
         * @property ShowTheWayModel
         * @type {{showthewayEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            showthewayEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<div class="showtheway"><a href="https://showtheway.io/to/32.178195,34.90761?name=Kefar%20Sava" target="_blank" title="Show the Way to Kefar Sava with your favorite navigation application">Show the Way</a></div><script src="https://showtheway.io/w.js" async="async" type="text/javascript"></script>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property ShowTheWayModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ShowTheWayModel.extend('ShowTheWayModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
