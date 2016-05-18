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
], function defineLetsPlayModel(BaseModel, WidgetContentModel) {

    /**
     * Define LetsPlay model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class LetsPlayModel
     * @constructor
     */
    var LetsPlayModel = function LetsPlayModel() {

        /**
         * Define preferences
         * @property LetsPlayModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property LetsPlayModel
         * @type {{}}
         */
        this.rules = {};
    };

    return LetsPlayModel.extend('LetsPlayModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
