/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineEmptyElement(PluginElement) {

    /**
     * Define Empty Element
     * @param view
     * @param opts
     * @returns {EmptyElement}
     * @constructor
     * @class EmptyElement
     * @extends PluginElement
     */
    var EmptyElement = function EmptyElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('empty', {resource: '/widgets'});

        return this;
    };

    return EmptyElement.extend('EmptyElement', {

        /**
         * Render Embedded content
         * @memberOf EmptyElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, PluginElement.prototype);

});