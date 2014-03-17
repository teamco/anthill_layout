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
     * @returns {WidgetContent}
     * @class WidgetContent
     * @constructor
     * @extends BaseElement
     */
    var WidgetContent = function WidgetContent(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.setPadding();

        return this;
    };

    return WidgetContent.extend({

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