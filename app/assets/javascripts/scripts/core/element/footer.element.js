/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineFooterElement(BaseElement) {

    /**
     * Define Footer Element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class FooterElement
     * @extends BaseElement
     */
    var FooterElement = function FooterElement(view, opts) {

        if (!view.getConfigHTML('footer')) {
            return this;
        }

        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return FooterElement.extend('FooterElement', {
    }, BaseElement.prototype);
});