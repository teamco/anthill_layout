/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePageDataElement(BaseElement) {

    /**
     * Define PageData Element
     * @param view
     * @param opts
     * @returns {PageDataElement}
     * @constructor
     * @class PageDataElement
     */
    var PageDataElement = function PageDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define max width
         * @type {*|number}
         */
        this.maxWidth = opts.maxWidth || 100;

        /**
         * Define min width
         * @type {*|number}
         */
        this.minWidth = opts.minWidth || 0;

        this.addCSS('page.data');

        return this;
    };

    return PageDataElement.extend({

    }, BaseElement.prototype);

});