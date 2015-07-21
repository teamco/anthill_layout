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
], function defineClocklinkModel(BaseModel, WidgetContentModel) {

    /**
     * Define Clocklink model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ClocklinkModel
     * @constructor
     */
    var ClocklinkModel = function ClocklinkModel() {

        /**
         * Define preferences
         * @memberOf ClocklinkModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @memberOf ClocklinkModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ClocklinkModel.extend('ClocklinkModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
