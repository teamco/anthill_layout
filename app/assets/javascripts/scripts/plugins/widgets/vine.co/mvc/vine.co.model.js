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
], function defineVineCoModel(BaseModel, WidgetContentModel) {

    /**
     * Define VineCo model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class VineCoModel
     * @constructor
     */
    var VineCoModel = function VineCoModel() {

        /**
         * Define preferences
         * @member VineCoModel
         * @type {{}}
         */
        this.preferences = {
            vinecoApi: {
                type: 'text',
                disabled: true,
                value: '//platform.vine.co/static/scripts/embed.js',
                visible: true
            },
            vinecoLink: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            vinecoType: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: 'Simple'
                    },
                    {
                        type: 'text',
                        value: 'Postcard'
                    }
                ],
                value: 'Simple',
                visible: true
            },
            vinecoAutoplayAudio: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            },
            vinecoRelatedVideos: {
                type: 'checkbox',
                disabled: false,
                value: false,
                visible: true
            }
        };

        /**
         * Define rules
         * @member VineCoModel
         * @type {{}}
         */
        this.rules = {};
    };

    return VineCoModel.extend('VineCoModel', {

        /**
         * Set link
         * @member VineCoModel
         * @param {string} link
         */
        setVinecoLink: function setVinecoLink(link) {
            this.setPrefs('vinecoLink', link);
        },

        /**
         * Set postcard type
         * @member VineCoModel
         * @param {string} type
         */
        setVinecoType: function setVinecoType(type) {
            this.setPrefs('vinecoType', type);
        },

        /**
         * Set auto play audio
         * @member VineCoModel
         * @param {boolean} audio
         */
        setVinecoAutoplayAudio: function setVinecoAutoplayAudio(audio) {
            this.setPrefs('vinecoAutoplayAudio', audio);
        },

        /**
         * Set related videos
         * @member VineCoModel
         * @param {boolean} video
         */
        setVinecoRelatedVideos: function setVinecoRelatedVideos(video) {
            this.setPrefs('vinecoRelatedVideos', video);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
