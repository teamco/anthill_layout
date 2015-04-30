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
], function defineInstagramModel(BaseModel, WidgetContentModel) {

    /**
     * Define Instagram model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class InstagramModel
     * @constructor
     */
    var InstagramModel = function InstagramModel() {

        /**
         * Define preferences
         * @memberOf InstagramModel
         * @type {{}}
         */
        this.preferences = {
            instagramEmbed: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf InstagramModel
         * @type {{}}
         */
        this.rules = {};
    };

    return InstagramModel.extend('InstagramModel', {

        /**
         * Set embed
         * @memberOf InstagramModel
         * @param {string} embed
         */
        setInstagramEmbed: function setInstagramEmbed(embed) {
            this.setPrefs('instagramEmbed', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
