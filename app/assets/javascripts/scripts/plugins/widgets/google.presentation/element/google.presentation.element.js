/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineGooglePresentationElement(BaseElement) {

    /**
     * Define GooglePresentation Element
     * @param view
     * @param opts
     * @returns {GooglePresentationElement}
     * @constructor
     * @class GooglePresentationElement
     * @extends BaseElement
     */
    var GooglePresentationElement = function GooglePresentationElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('google.presentation', {resource: '/widgets'});

        return this;
    };

    return GooglePresentationElement.extend('GooglePresentationElement', {

        /**
         * Render Embedded content
         * @memberOf GooglePresentationElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            /**
             * Define $iframe
             * @type {*|jQuery|HTMLElement}
             */
            var $embed = $(embed);

            if ($embed.length === 0) {
                return false;
            }

            this.$.append(
                $('<iframe />').attr({
                    src: $embed[0].src
                })
            );
        }

    }, BaseElement.prototype);

});
