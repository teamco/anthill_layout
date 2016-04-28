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
], function defineIframelyModel(BaseModel, WidgetContentModel) {

    /**
     * Define Iframely model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class IframelyModel
     * @constructor
     */
    var IframelyModel = function IframelyModel() {

        /**
         * Define preferences
         * @property IframelyModel
         * @type {{}}
         */
        this.preferences = {
            iframelyApiKey: {
                type: 'text',
                disabled: true,
                value: '5091335a2cdc457dcc7ad4',
                visible: true
            },
            iframelyUrl: {
                type: 'text',
                disabled: false,
                value: '<div class="showtheway"><a href="https://showtheway.io/to/32.178195,34.90761?name=Kefar%20Sava" target="_blank" title="Show the Way to Kefar Sava with your favorite navigation application">Show the Way</a></div><script src="https://showtheway.io/w.js" async="async" type="text/javascript"></script>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property IframelyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return IframelyModel.extend('IframelyModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
