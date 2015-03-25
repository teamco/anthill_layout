/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineApplicationContentElement(BaseElement) {

    /**
     * Define Application content element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class ApplicationContentElement
     * @extends BaseElement
     */
    var ApplicationContentElement = function ApplicationContentElement(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return ApplicationContentElement.extend('ApplicationContentElement', {

    }, BaseElement.prototype);
});