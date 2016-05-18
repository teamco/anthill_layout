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
], function defineParticipantsModel(BaseModel, WidgetContentModel) {

    /**
     * Define Participants model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class ParticipantsModel
     * @constructor
     */
    var ParticipantsModel = function ParticipantsModel() {

        /**
         * Define preferences
         * @property ParticipantsModel
         * @type {{}}
         */
        this.preferences = {
            // Preferences
        };

        /**
         * Define rules
         * @property ParticipantsModel
         * @type {{}}
         */
        this.rules = {};
    };

    return ParticipantsModel.extend('ParticipantsModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
