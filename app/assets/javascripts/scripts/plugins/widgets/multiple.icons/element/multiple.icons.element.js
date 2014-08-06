/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
    // 'plugins/widgets/multiple.icons/mvc/multiple.icons.behavior'
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

        this.addCSS('multiple.icons', {
            resource: '/widgets'
        });

        return this;
    };

    return MultipleIconsElement.extend('MultipleIconsElement', {

        /**
         * Render Embedded content
         * @member MultipleIconsElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $list = '<ul class="icons-container"/>';

            $element.view.controller.clearParentThumbnail();
            $element.$.append($list);

            require([
                'plugins/widgets/multiple.icons/mvc/multiple.icons.behavior'
            ], function showMultipleIcons(MultipleIconsBehavior) {
                var showMultipleIcons = new MultipleIconsBehavior();
            });
        }

    }, BaseElement.prototype);

});