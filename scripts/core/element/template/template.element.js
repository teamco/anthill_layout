/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 2/3/13
 * Time: 12:04 AM
 */

define([
    'modules/element'
], function defineTemplateElement(BaseElement) {

    /**
     * Define template element
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class TemplateElement
     * @extends BaseElement
     */
    var TemplateElement = function TemplateElement(view, opts) {

        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: false
        });
    };

    return TemplateElement.extend('TemplateElement', {

    }, BaseElement.prototype);
});