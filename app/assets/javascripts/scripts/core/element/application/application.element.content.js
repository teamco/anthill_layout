/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineAppContent(BaseElement) {

    /**
     * Define App content
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class AppContent
     * @extends BaseElement
     */
    var AppContent = function AppContent(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return AppContent.extend('AppContent', {

    }, BaseElement.prototype);
});