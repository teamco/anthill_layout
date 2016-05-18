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
], function defineDemoChatModel(BaseModel, WidgetContentModel) {

    /**
     * Define DemoChat model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class DemoChatModel
     * @constructor
     */
    var DemoChatModel = function DemoChatModel() {

        /**
         * Define preferences
         * @property DemoChatModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property DemoChatModel
         * @type {{}}
         */
        this.rules = {};
    };

    return DemoChatModel.extend('DemoChatModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
