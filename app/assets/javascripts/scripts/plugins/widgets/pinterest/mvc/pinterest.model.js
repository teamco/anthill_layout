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
], function definePinterestModel(BaseModel, WidgetContentModel) {

    /**
     * Define Pinterest model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class PinterestModel
     * @constructor
     */
    var PinterestModel = function PinterestModel() {

        /**
         * Define preferences
         * @member PinterestModel
         * @type {{
         *      pinterestApi: {type: string, disabled: boolean, value: string, visible: boolean},
         *      pinterestBoardUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            pinterestApi: {
                type: 'text',
                disabled: true,
                value: 'https://assets.pinterest.com/js/pinit.js',
                visible: true
            },
            pinterestBoardUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true,
                validate: {
                    mask: /^(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-]+)?)?(?:\&[\w]+\=[\w\-]+)*)$/,
                    blank: true
                }
            },
            pinterestType: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: 'Pin widget',
                        tooltip: 'Embed one of your Pins on your site'
                    },
                    {
                        type: 'text',
                        value: 'Profile widget',
                        tooltip: 'Show up to 30 of your latest Pins on your site'
                    },
                    {
                        type: 'text',
                        value: 'Board widget',
                        tooltip: 'Show up to 30 of your favorite board’s latest Pins'
                    }
                ],
                value: 'Pin widget',
                visible: true
            },
            pinterestImageWidth: {
                type: 'text',
                disabled: false,
                value: 80,
                visible: true,
                validate: {
                    mask: /^\d/,
                    blank: true
                }
            },
            pinterestBoardHeight: {
                type: 'text',
                disabled: false,
                value: 320,
                visible: true,
                validate: {
                    mask: /^\d/,
                    blank: true
                }
            },
            pinterestBoardWidth: {
                type: 'text',
                disabled: false,
                value: 400,
                visible: true,
                validate: {
                    mask: /^\d/,
                    blank: true
                }
            }
        };

        /**
         * Define rules
         * @member PinterestModel
         * @type {{}}
         */
        this.rules = {};
    };

    return PinterestModel.extend('PinterestModel', {

        /**
         * Set pinterest board url
         * @member PinterestModel
         * @param {string} url
         */
        setPinterestBoardUrl: function setPinterestBoardUrl(url) {
            this.setPrefs('pinterestBoardUrl', url);
        },

        /**
         * Set pinterest type
         * @member PinterestModel
         * @param {string} type
         */
        setPinterestType: function setPinterestType(type) {
            this.setPrefs('pinterestType', type);
        },

        /**
         * Set pinterest image width
         * @member PinterestModel
         * @param {number} width
         */
        setPinterestImageWidth: function setPinterestImageWidth(width) {
            this.setPrefs('pinterestImageWidth', width);
        },

        /**
         * Set pinterest board height
         * @member PinterestModel
         * @param {number} height
         */
        setPinterestBoardHeight: function setPinterestBoardHeight(height) {
            this.setPrefs('pinterestBoardHeight', height);
        },

        /**
         * Set pinterest board width
         * @member PinterestModel
         * @param {number} width
         */
        setPinterestBoardWidth: function setPinterestBoardWidth(width) {
            this.setPrefs('pinterestBoardWidth', width);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});
