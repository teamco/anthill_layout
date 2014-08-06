/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 6:35 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineBaseString() {

    /**
     * Define BaseUserAgent
     * @constructor
     * @class BaseUserAgent
     */
    var BaseUserAgent = function BaseUserAgent() {

        /**
         * Define user agent
         * @type {string}
         */
        var ua = navigator.userAgent.toLowerCase();

        /**
         * Define browsers
         * @memberOf BaseUserAgent
         * @type {{
         *      mozilla: boolean,
         *      webkit: boolean,
         *      opera: boolean,
         *      msie: boolean
         * }}
         */
        this.browser = {
            mozilla: /mozilla/.test(ua) && !/webkit/.test(ua),
            webkit: /webkit/.test(ua),
            opera: /opera/.test(ua),
            msie: /msie/.test(ua)
        };
    };

    BaseUserAgent.extend('BaseUserAgent', {

        /**
         * Get version
         * @memberOf BaseUserAgent
         * @returns {*}
         */
        version: function version() {
            return (navigator.userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
        },

        /**
         * Get MSIE
         * @memberOf BaseUserAgent
         * @returns {*}
         */
        msie: function msie() {
            if (this.browser.msie) {
                return this.version();
            }
        },

        /**
         * Get Opera
         * @memberOf BaseUserAgent
         * @returns {*}
         */
        opera: function opera() {
            if (this.browser.opera) {
                return this.version();
            }
        },

        /**
         * Get Chrome
         * @memberOf BaseUserAgent
         * @returns {*}
         */
        chrome: function chrome() {
            if (this.browser.webkit) {
                if (navigator.vendor.match(/Google/)) {
                    return this.version();
                }
            }
        },

        /**
         * Get Safari
         * @memberOf BaseUserAgent
         * @returns {*}
         */
        safari: function safari() {
            if (this.browser.webkit) {
                if (navigator.vendor.match(/Apple/)) {
                    return this.version();
                }
            }
        }
    });

    return new BaseUserAgent();

});