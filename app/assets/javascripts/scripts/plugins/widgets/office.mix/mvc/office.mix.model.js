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
], function defineOfficeMixModel(BaseModel, WidgetContentModel) {

    /**
     * Define OfficeMix model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class OfficeMixModel
     * @constructor
     */
    var OfficeMixModel = function OfficeMixModel() {

        /**
         * Define preferences
         * @property OfficeMixModel
         * @type {{officemixEmbedCode: {type: string, disabled: boolean, value: string, visible: boolean}}}
         */
        this.preferences = {
            officemixEmbedCode: {
                type: 'textarea',
                disabled: false,
                value: '<iframe width="608" height="392" src="https://mix.office.com/embed/1otxpj7hz6kbx" frameborder="0" allowfullscreen></iframe>',
                visible: true
            }
        };

        /**
         * Define rules
         * @property OfficeMixModel
         * @type {{}}
         */
        this.rules = {};
    };

    return OfficeMixModel.extend('OfficeMixModel', {

        // Setter

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
