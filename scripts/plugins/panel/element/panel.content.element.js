/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePanelContentElement(BaseElement) {

    /**
     * Define Panel Content Element
     * @param view
     * @param opts
     * @returns {PanelContentElement}
     * @constructor
     * @class PanelContentElement
     */
    var PanelContentElement = function PanelContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this;
    };

    return PanelContentElement.extend({

    }, BaseElement.prototype);

});