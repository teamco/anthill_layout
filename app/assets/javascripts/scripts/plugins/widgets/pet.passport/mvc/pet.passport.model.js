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
], function definePetPassportModel(BaseModel, WidgetContentModel) {

    /**
     * Define PetPassport model
     * @extends BaseModel
     * @class PetPassportModel
     * @constructor
     */
    var PetPassportModel = function PetPassportModel() {

        /**
         * Define preferences
         * @memberOf PetPassportModel
         * @type {{}}
         */
        this.preferences = {
        };

        /**
         * Define rules
         * @memberOf PetPassportModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PetPassportModel.extend('PetPassportModel', {


    }, BaseModel.prototype, WidgetContentModel.prototype);
});