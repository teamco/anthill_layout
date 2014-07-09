/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMultipleIconsElement(BaseElement) {

    /**
     * Define MultipleIcons Element
     * @param view
     * @param opts
     * @returns {MultipleIconsElement}
     * @constructor
     * @class MultipleIconsElement
     * @extends BaseElement
     */
    var MultipleIconsElement = function MultipleIconsElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('multiple.icons', {resource: '/widgets'});

        return this;
    };

    return MultipleIconsElement.extend('MultipleIconsElement', {

        /**
         * Render Embedded content
         * @member MultipleIconsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            // TODO
        }

    }, BaseElement.prototype);

});