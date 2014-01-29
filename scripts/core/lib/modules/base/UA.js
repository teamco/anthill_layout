/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/2/13
 * Time: 6:35 PM
 * To change this template use File | Settings | File Templates.
 */

define([], function defineBaseString(Base) {

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

    BaseUserAgent.extend({
        version: function version() {
            return (navigator.userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
        },
        msie: function msie() {
            if (this.browser.msie) {
                return this.version();
            }
        },
        opera: function opera() {
            if (this.browser.opera) {
                return this.version();
            }
        },
        chrome: function chrome() {
            if (this.browser.webkit) {
                if (navigator.vendor.match(/Google/)) {
                    return this.version();
                }
            }
        },
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