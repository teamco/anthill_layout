/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineIceFloeElement(BaseElement) {

    /**
     * Define IceFloe Element
     * @param view
     * @param opts
     * @returns {IceFloeElement}
     * @constructor
     * @class IceFloeElement
     * @extends BaseElement
     */
    var IceFloeElement = function IceFloeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('icefloe', {
            resource: '/widgets'
        });

        return this;
    };

    return IceFloeElement.extend('IceFloeElement', {

        /**
         * Render Embedded content
         * @member IceFloeElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {
            var $element = this;
            var $iceFloe = '<div class="floe_base"></div>';
            $element.view.controller.clearParentThumbnail();
            $element.$.append(
                $iceFloe
            );
        }

    }, BaseElement.prototype);

});