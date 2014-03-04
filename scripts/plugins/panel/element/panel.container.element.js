/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePanelContainerElement(BaseElement) {

    /**
     * Define Panel Container Element
     * @param view
     * @param opts
     * @returns {PanelContainerElement}
     * @constructor
     * @class PanelContainerElement
     */
    var PanelContainerElement = function PanelContainerElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PanelContainerElement.extend({

        /**
         * Toggle open class
         * @param {Boolean} open
         */
        opened: function opened(open) {
            open ?
                this.$.addClass('close') :
                this.$.removeClass('close');
        }

    }, BaseElement.prototype);

});