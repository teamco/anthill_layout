/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function defineTemplateContent(BaseElement) {

    /**
     * Define Template Content
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class TemplateContent
     * @extends BaseElement
     */
    var TemplateContent = function TemplateContent(view, opts) {
        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return TemplateContent.extend('TemplateContent', {

    }, BaseElement.prototype);
});