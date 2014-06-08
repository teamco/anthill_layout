/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePanelTabElement(BaseElement) {

    /**
     * Define Panel Tab Element
     * @param view
     * @param opts
     * @returns {PanelTabElement}
     * @constructor
     * @class PanelTabElement
     * @extends BaseElement
     */
    var PanelTabElement = function PanelTabElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PanelTabElement.extend('PanelTabElement', {

    }, BaseElement.prototype);

});