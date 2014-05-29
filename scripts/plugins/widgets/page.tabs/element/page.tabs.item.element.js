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
     * Define PageTabs Item Element
     * @param view
     * @param opts
     * @constructor
     * @class PageTabsItemElement
     * @extends BaseElement
     * @returns {PageTabsItemElement}
     */
    var PageTabsItemElement = function PageTabsItemElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: true
        });

        /**
         * Define page tab item
         * @member PageTabsItemElement
         * @type {$pageTab.pageTab|*}
         */
        this.pageTab = opts.pageTab;

        this.initContent();

        return this;
    };

    return PageTabsItemElement.extend('PageTabsItemElement', {

        /**
         * Init Embedded content
         * @member PageTabsItemElement
         */
        initContent: function initContent() {

        }

    }, BaseElement.prototype);

});