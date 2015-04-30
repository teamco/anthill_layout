/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineRadikalFotoElement(BaseElement) {

    /**
     * Define RadikalFoto Element
     * @param view
     * @param opts
     * @returns {RadikalFotoElement}
     * @constructor
     * @class RadikalFotoElement
     * @extends BaseElement
     */
    var RadikalFotoElement = function RadikalFotoElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('radikal.foto', {resource: '/widgets'});

        return this;
    };

    return RadikalFotoElement.extend('RadikalFotoElement', {

        /**
         * Render Embedded content
         * @memberOf RadikalFotoElement
         * @param {string} url
         */
        renderEmbeddedContent: function renderEmbeddedContent(url) {
            this.$.append(
                $('<img />').attr({
                    src: url
                })
            );
        }

    }, BaseElement.prototype);

});
