/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineEmptyElement(BaseElement) {

    /**
     * Define Empty Element
     * @param view
     * @param opts
     * @returns {EmptyElement}
     * @constructor
     * @class EmptyElement
     * @extends BaseElement
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
         * @member EmptyElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, BaseElement.prototype);

});