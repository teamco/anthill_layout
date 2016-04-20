/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineContent(BaseElement) {

    /**
     * Define content
     * @param view
     * @param opts
     * @returns {WidgetContentElement}
     * @class WidgetContentElement
     * @constructor
     * @extends BaseElement
     */
    var WidgetContentElement = function WidgetContentElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.setPadding();
        this.setBackgroundImage(opts);

        return this;
    };

    return WidgetContentElement.extend('WidgetContentElement', {

        /**
         * Set background image
         * @memberOf WidgetContentElement
         * @param {{resource: string}} opts
         */
        setBackgroundImage: function setBackgroundImage(opts) {
            this.$.addClass(
                opts.resource.replace(/\./g, '-')
            );
        },

        /**
         * Set padding
         * @memberOf WidgetContentElement
         */
        setPadding: function setPadding() {
            var padding = this.view.controller.getLocalPadding();
            this.$.css(padding);
        },

        /**
         * Clean Metamorphic Content
         * @memberOf WidgetContentElement
         */
        cleanMetamorphicContent: function cleanMetamorphicContent() {

            if (!this.$.hasClass('metamorphic')) {
                return false;
            }

            $('> *', this.$).not(':hidden').remove();
        }

    }, BaseElement.prototype);
});