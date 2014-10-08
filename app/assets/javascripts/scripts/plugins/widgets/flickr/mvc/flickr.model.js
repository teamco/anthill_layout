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
], function defineFlickrModel(BaseModel, WidgetContentModel) {

    /**
     * Define Flickr model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class FlickrModel
     * @constructor
     */
    var FlickrModel = function FlickrModel() {

        /**
         * Define preferences
         * @member FlickrModel
         * @type {{
         *      flickEmbed: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            flickrEmbed: {
                type: 'textarea',
                disabled: false,
                value: undefined,
                visible: true
            }
        };

        /**
         * Define rules
         * @member FlickrModel
         * @type {{}}
         */
        this.rules = {};
    };

    return FlickrModel.extend('FlickrModel', {

        /**
         * Set embed
         * @member FlickrModel
         * @param {string} embed
         */
        setFlickrEmbed: function setFlickrEmbed(embed) {
            this.setPrefs('flickrEmbed', embed);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
