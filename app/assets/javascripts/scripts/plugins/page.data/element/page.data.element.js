/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePageDataElement(BaseElement) {

    /**
     * Define PageData Element
     * @param view
     * @param opts
     * @returns {PageDataElement}
     * @constructor
     * @class PageDataElement
     * @extends BaseElement
     */
    var PageDataElement = function PageDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('page.data');
        this.addCSS('preferences');

        return this;
    };

    return PageDataElement.extend('PageDataElement', {

        /**
         * Get footer html
         * @memberOf PageDataElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength(
                    this.view.scope.controller.getData()
                ),
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});