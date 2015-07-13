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
], function defineEmbedlyModel(BaseModel, WidgetContentModel) {

    /**
     * Define Embedly model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class EmbedlyModel
     * @constructor
     */
    var EmbedlyModel = function EmbedlyModel() {

        /**
         * Define preferences
         * @memberOf EmbedlyModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @memberOf EmbedlyModel
         * @type {{}}
         */
        this.rules = {};
    };

    return EmbedlyModel.extend('EmbedlyModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
