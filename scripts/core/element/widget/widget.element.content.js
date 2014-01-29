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
     * @returns {Content}
     * @class Content
     * @constructor
     */
    var Content = function Content(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.setPadding();
        this.setContent();

        return this;
    };

    return Content.extend({

        /**
         * Set content
         * @member Content
         */
        setContent: function setContent() {
            this.$.text(this.view.scope.model.getUUID());
        },

        /**
         * Set padding
         */
        setPadding: function setPadding() {
            var padding = this.view.controller.getLocalPadding();
            this.$.css(padding);
        }

    }, BaseElement.prototype);
});