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
], function defineJwplayerModel(BaseModel, WidgetContentModel) {

    /**
     * Define Jwplayer model
     * @extends BaseModel
     * @extends WidgetContentModel
     * @class JwplayerModel
     * @constructor
     */
    var JwplayerModel = function JwplayerModel() {

        /**
         * Define preferences
         * @memberOf JwplayerModel
         * @type {{
         *      jwplayerCloudHostedScriptUrl: {type: string, disabled: boolean, value: undefined, visible: boolean}
         * }}
         */
        this.preferences = {
            jwplayerVideoTitle: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            jwplayerScriptUrl: {
                type: 'text',
                disabled: false,
                value: 'http://jwpsrv.com/library/97CHiO2IEeOGQyIACtqXBA.js',
                visible: true
            },
            jwplayerRtmpUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            jwplayerImageUrl: {
                type: 'text',
                disabled: false,
                value: undefined,
                visible: true
            },
            jwplayerWidth: {
                type: 'text',
                disabled: false,
                value: '100%',
                visible: true
            },
            jwplayerAspectRatio: {
                type: 'combobox',
                disabled: false,
                list: [
                    {
                        type: 'text',
                        value: '16:9 - Wide screen TV'
                    },
                    {
                        type: 'text',
                        value: '16:10 - Monitor screens'
                    },
                    {
                        type: 'text',
                        value: '4:3 - Classic TV'
                    },
                    {
                        type: 'text',
                        value: '3:2 - Photo camera'
                    },
                    {
                        type: 'text',
                        value: '1:1 - Square'
                    },
                    {
                        type: 'text',
                        value: '2.4:1 - Cinemascope'
                    }
                ],
                value: '16:9 - Wide screen TV',
                visible: true
            },
            jwplayerAutoStart: {
                type: 'checkbox',
                disabled: false,
                value: true,
                visible: true
            }
        };

        /**
         * Define rules
         * @memberOf JwplayerModel
         * @type {{}}
         */
        this.rules = {};
    };

    return JwplayerModel.extend('JwplayerModel', {

        /**
         * Set Jwplayer video title
         * @memberOf JwplayerModel
         * @param {string} title
         */
        setJwplayerVideoTitle: function setJwplayerVideoTitle(title) {
            this.setPrefs('jwplayerVideoTitle', title);
        },
        /**
         * Set Jwplayer cloud script url
         * @memberOf JwplayerModel
         * @param {string} url
         */
        setJwplayerScriptUrl: function setJwplayerScriptUrl(url) {
            this.setPrefs('jwplayerScriptUrl', url);
        },
        /**
         * Set Jwplayer rtmp file url
         * @memberOf JwplayerModel
         * @param {string} url
         */
        setJwplayerRtmpUrl: function setJwplayerRtmpUrl(url) {
            this.setPrefs('jwplayerRtmpUrl', url);
        },
        /**
         * Set Jwplayer image url
         * @memberOf JwplayerModel
         * @param {string} url
         */
        setJwplayerImageUrl: function setJwplayerImageUrl(url) {
            this.setPrefs('jwplayerImageUrl', url);
        },
        /**
         * Set Jwplayer width
         * @memberOf JwplayerModel
         * @param {string} width
         */
        setJwplayerWidth: function setJwplayerWidth(width) {
            this.setPrefs('jwplayerWidth', width);
        },
        /**
         * Set Jwplayer aspect ratio
         * @memberOf JwplayerModel
         * @param {string} ratio
         */
        setJwplayerAspectRatio: function setJwplayerAspectRatio(ratio) {
            this.setPrefs('jwplayerAspectRatio', ratio);
        },
        /**
         * Set Jwplayer auto start
         * @memberOf JwplayerModel
         * @param {boolean} autostart
         */
        setJwplayerAutoStart: function setJwplayerAutoStart(autostart) {
            this.setPrefs('jwplayerAutoStart', autostart);
        }

    }, BaseModel.prototype, WidgetContentModel.prototype);
});