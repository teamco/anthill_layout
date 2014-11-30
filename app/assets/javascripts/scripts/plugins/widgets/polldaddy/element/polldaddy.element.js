/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePolldaddyElement(BaseElement) {

    /**
     * Define Polldaddy Element
     * @param view
     * @param opts
     * @returns {PolldaddyElement}
     * @constructor
     * @class PolldaddyElement
     * @extends BaseElement
     */
    var PolldaddyElement = function PolldaddyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('polldaddy', {resource: '/widgets'});

        return this;
    };

    return PolldaddyElement.extend('PolldaddyElement', {

        /**
         * Render Embedded content
         * @member PolldaddyElement
         * @param {string} embed
         */
        renderEmbeddedContent: function renderEmbeddedContent(embed) {
            this.$.append(embed);
        }

    }, BaseElement.prototype);

});
