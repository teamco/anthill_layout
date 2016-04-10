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
], function defineOrphusModel(BaseModel, WidgetContentModel) {

    /**
     * Define Orphus model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OrphusModel
     * @constructor
     */
    var OrphusModel = function OrphusModel() {

        /**
         * Define preferences
         * @property OrphusModel
         * @type {{orphusMainScript: {type: string, disabled: boolean, visible: boolean}}}
         */
        this.preferences = {
            orphusMainScript: {
                type: 'textarea',
                disabled: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @property OrphusModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OrphusModel.extend('OrphusModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
