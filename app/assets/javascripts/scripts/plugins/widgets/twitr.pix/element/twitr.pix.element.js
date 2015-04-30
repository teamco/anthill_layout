/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineTwitrPixElement(BaseElement) {

    /**
     * Define TwitrPix Element
     * @param view
     * @param opts
     * @returns {TwitrPixElement}
     * @constructor
     * @class TwitrPixElement
     * @extends BaseElement
     */
    var TwitrPixElement = function TwitrPixElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('twitr.pix', {resource: '/widgets'});

        return this;
    };

    return TwitrPixElement.extend('TwitrPixElement', {

        /**
         * Render Embedded content
         * @memberOf TwitrPixElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            if (!(embed && (embed + '').match(/^<a/))) {
                return false;
            }

            this.$.append(embed);
        }

    }, BaseElement.prototype);

});
