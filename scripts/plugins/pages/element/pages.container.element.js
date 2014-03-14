/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePagesContainerElement(BaseElement) {

    /**
     * Define Pages Container Element
     * @param view
     * @param opts
     * @returns {PagesContainerElement}
     * @constructor
     * @class PagesContainerElement
     */
    var PagesContainerElement = function PagesContainerElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        return this;
    };

    return PagesContainerElement.extend({

    }, BaseElement.prototype);

});