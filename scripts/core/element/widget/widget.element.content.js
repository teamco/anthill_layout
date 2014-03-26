/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
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
        this.setBackgroundImage(opts.thumbnail);

        return this;
    };

    return WidgetContentElement.extend('WidgetContentElement', {

        /**
         * Set background image
         * @member WidgetElement
         * @param {string} url
         */
        setBackgroundImage: function setBackgroundImage(url) {
            this.$.css({
                backgroundImage: 'url("' + url + '")'
            });
        },

        /**
         * Set padding
         * @memberOf WidgetContent
         */
        setPadding: function setPadding() {
            var padding = this.view.controller.getLocalPadding();
            this.$.css(padding);
        }

    }, BaseElement.prototype);
});