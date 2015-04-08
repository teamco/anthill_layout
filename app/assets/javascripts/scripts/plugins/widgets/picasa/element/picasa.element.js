/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePicasaElement(BaseElement) {

    /**
     * Define Picasa Element
     * @param view
     * @param opts
     * @returns {PicasaElement}
     * @constructor
     * @class PicasaElement
     * @extends BaseElement
     */
    var PicasaElement = function PicasaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('picasa', {resource: '/widgets'});

        return this;
    };

    return PicasaElement.extend('PicasaElement', {

        /**
         * Render Embedded content
         * @memberOf PicasaElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            this.empty();

            if (!embed) {
                return false;
            }

            if (embed.match(/^<table/)) {
                this.$.append(embed);
            }

            if (embed.match(/^<embed/)) {
                this.$.append(
                    this.renderEmbed(embed)
                );
            }
        }

    }, BaseElement.prototype);

});
