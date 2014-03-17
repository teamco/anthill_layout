/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineDeltaScroll(BaseElement) {

    /**
     * Define delta scroll
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class DeltaScroll
     * @extends BaseElement
     */
    var DeltaScroll = function DeltaScroll(view, opts) {
        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return DeltaScroll.extend('DeltaScroll', {

    }, BaseElement.prototype);
});