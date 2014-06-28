/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineIcefloeElement(BaseElement) {

    /**
     * Define Icefloe Element
     * @param view
     * @param opts
     * @returns {IcefloeElement}
     * @constructor
     * @class IcefloeElement
     * @extends BaseElement
     */
    var IcefloeElement = function IcefloeElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('icefloe', {
            resource: '/widgets'
        });

        return this;
    };

    return IcefloeElement.extend('IcefloeElement', {

        /**
         * Render Embedded content
         * @member IcefloeElement
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