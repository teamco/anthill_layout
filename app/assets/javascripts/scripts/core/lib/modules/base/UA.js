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
         * Define browser info
         * @member BaseUserAgent
         */
        this.browser = (function () {
            var ua = navigator.userAgent, tem,
                M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return ['IE', (tem[1] || '')];
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/)
                if (tem != null) return ['Opera', tem[1]];
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
            return M;
        })();
    };

    BaseUserAgent.extend('BaseUserAgent', {

        /**
         * Get browser version
         * @param {RegExp} regexp
         * @returns {*}
         * @private
         */
        _getBrowserInfo: function _getBrowserInfo(regexp) {
            if (this.browser[0].match(regexp)) {
                return this.browser[1];
            }
        },

        /**
         * Get Opera
         * @member BaseUserAgent
         * @returns {*}
         */
        opera: function opera() {
            this._getBrowserInfo(/opera/i);
        },

        /**
         * Get Chrome
         * @member BaseUserAgent
         * @returns {*}
         */
        chrome: function chrome() {
            this._getBrowserInfo(/chrome/i);
        },

        /**
         * Get Safari
         * @member BaseUserAgent
         * @returns {*}
         */
        safari: function safari() {
            this._getBrowserInfo(/safari/i);
        },

        /**
         * Get Firefox
         * @member BaseUserAgent
         * @returns {*}
         */
        firefox: function firefox() {
            this._getBrowserInfo(/firefox/i);
        },

        /**
         * Get MS Internet explorer
         * @member BaseUserAgent
         * @returns {*}
         */
        msie: function msie() {
            this._getBrowserInfo(/ie/i);
        },

        /**
         * Get browser zoom
         * @member BaseUserAgent
         * @returns {number}
         */
        getBrowserZoom: function getBrowserZoom() {

            var zoom = 1;

            // Get Chrome/Safari zoome
            if (this.chrome() || this.safari()) {
                zoom = 1 / (screen.width / $(window).width());
            }

            // Get Firefox zoom
            if (this.firefox() && !isNaN(window.devicePixelRatio)) {
                zoom = 1 / (window.devicePixelRatio);
            }

            // Get IE zoom
            if (this.msie() && !isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
                zoom = 1 / (Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100);
            }

            return zoom;
        }
    });

    return new BaseUserAgent();

});