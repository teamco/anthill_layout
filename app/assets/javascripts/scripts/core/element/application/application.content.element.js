/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineAppContentElement(BaseElement) {

    /**
     * Define App content element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class AppContentElement
     * @extends BaseElement
     */
    var AppContentElement = function AppContentElement(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return AppContentElement.extend('AppContentElement', {

    }, BaseElement.prototype);
});