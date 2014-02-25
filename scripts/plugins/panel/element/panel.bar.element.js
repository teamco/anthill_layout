/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePanelBarElement(BaseElement) {

    /**
     * Define Panel Bar Element
     * @param view
     * @param opts
     * @returns {PanelBarElement}
     * @constructor
     * @class PanelBarElement
     */
    var PanelBarElement = function PanelBarElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PanelBarElement.extend({

    }, BaseElement.prototype);

});