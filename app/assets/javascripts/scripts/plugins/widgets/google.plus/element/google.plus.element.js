/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineGooglePlusElement(BaseElement) {

    /**
     * Define GooglePlus Element
     * @param view
     * @param opts
     * @returns {GooglePlusElement}
     * @constructor
     * @class GooglePlusElement
     * @extends BaseElement
     */
    var GooglePlusElement = function GooglePlusElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('google.plus', {resource: '/widgets'});

        return this;
    };

    return GooglePlusElement.extend('GooglePlusElement', {

        /**
         * Render Embedded content
         * @member GooglePlusElement
         * @param {string} api
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(api, url) {

            this.empty();

            var $element = this;

            require(['async!' + api], function defineGooglePlusApi() {
                $element.$.append('<div class="g-post" data-href="' + url + '"></div>');
            });
        }

    }, BaseElement.prototype);

});
