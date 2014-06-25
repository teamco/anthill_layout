/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
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

        /**
         * Define current page class name
         * @type {string}
         */
        this.current = 'current';

        this.addCSS('page.tabs', {resource: '/widgets'});

        return this;
    };

    return PageTabsElement.extend('PageTabsElement', {

        /**
         * Render Embedded content
         * @member PageTabsElement
         * @param {{}} pages
         * @param {Page} page
         */
        renderEmbeddedContent: function renderEmbeddedContent(pages, page) {

            this.empty();

            for (var index in pages) {

                if (pages.hasOwnProperty(index)) {

                    this.$.append(
                        this.view.renderPageTabsItem(
                            pages[index],
                            page === pages[index] ? this.current : ''
                        )
                    );
                }
            }

            this.view.controller.clearParentThumbnail();
        }

    }, BaseElement.prototype);

});