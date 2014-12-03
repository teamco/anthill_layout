/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineScreencastElement(BaseElement) {

    /**
     * Define Screencast Element
     * @param view
     * @param opts
     * @returns {ScreencastElement}
     * @constructor
     * @class ScreencastElement
     * @extends BaseElement
     */
    var ScreencastElement = function ScreencastElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('screencast', {resource: '/widgets'});

        return this;
    };

    return ScreencastElement.extend('ScreencastElement', {

        /**
         * Render Embedded content
         * @member ScreencastElement
         * @param {{type, src}} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {

            this.$.append(
                embed.type === 'object' ?
                    this.renderObject(embed.src) :
                    embed.src
            );
        }

    }, BaseElement.prototype);

});
