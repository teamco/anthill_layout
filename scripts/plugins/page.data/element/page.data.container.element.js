/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePageDataContainerElement(BaseElement) {

    /**
     * Define PageData Container Element
     * @param view
     * @param opts
     * @returns {PageDataContainerElement}
     * @constructor
     * @class PageDataContainerElement
     */
    var PageDataContainerElement = function PageDataContainerElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PageDataContainerElement.extend({

    }, BaseElement.prototype);

});