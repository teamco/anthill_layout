/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePageTabsElement(BaseElement) {

    /**
     * Define PageTabs Element
     * @param view
     * @param opts
     * @returns {PageTabsElement}
     * @constructor
     * @class PageTabsElement
     * @extends BaseElement
     */
    var PageTabsElement = function PageTabsElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('page.tabs', {resource: '/widgets'});

        return this;
    };

    return PageTabsElement.extend('PageTabsElement', {

        /**
         * Render Embedded content
         * @member PageTabsElement
         * @param {{}} pages
         */
        renderEmbeddedContent: function renderEmbeddedContent(pages) {

            for (var index in pages) {

                if (pages.hasOwnProperty(index)) {

                    this.view.renderPageTabsItem(pages[index]);
                }
            }
        }

    }, BaseElement.prototype);

});