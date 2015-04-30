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
], function defineAvatarModel(BaseModel, WidgetContentModel) {

    /**
     * Define Avatar model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class AvatarModel
     * @constructor
     */
    var AvatarModel = function AvatarModel() {

        /**
         * Define preferences
         * @memberOf AvatarModel
         * @type {{}}
         */
        this.preferences = {
            avatarCoordinateX: {
                type: "number",
                disable: true,
                value: undefined,
                visible: true
            },
            avatarCoordinateY: {
                type: "number",
                disable: true,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf AvatarModel
         * @type {{}}
         */
        this.rules = {};
    };

    return AvatarModel.extend('AvatarModel', {

        setAvatarCoordinateX: function setAvatarCoordinateX(x) {
            this.setPrefs('avatarCoordinateX', x);
        },
        setAvatarCoordinateY: function setAvatarCoordinateY(y) {
            this.setPrefs('avatarCoordinateY', y);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});