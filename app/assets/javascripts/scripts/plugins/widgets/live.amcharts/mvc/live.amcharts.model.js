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
], function defineLiveAmchartsModel(BaseModel, WidgetContentModel) {

    /**
     * Define LiveAmcharts model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class LiveAmchartsModel
     * @constructor
     */
    var LiveAmchartsModel = function LiveAmchartsModel() {

        /**
         * Define preferences
         * @property LiveAmchartsModel
         * @type {{liveamchartsEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            liveamchartsEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe width="600" height="400" src="https://live.amcharts.com/zOTk5/embed/" frameborder="0"></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property LiveAmchartsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LiveAmchartsModel.extend(
        'LiveAmchartsModel', {},
        BaseModel.prototype,
        WidgetContentModel.prototype
    );
});
