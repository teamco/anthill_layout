/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/element'
], function definePageContent(BaseElement) {

    /**
     * Define page content
     * @param view
     * @param opts
     * @returns {*}
     * @constructor
     * @class PageContent
     */
    var PageContent = function PageContent(view, opts) {

        return this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return PageContent.extend({

    }, BaseElement.prototype);
});