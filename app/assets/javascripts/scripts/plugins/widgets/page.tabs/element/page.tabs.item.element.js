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
            destroy: false
        });

        /**
         * Define page tab item
         * @memberOf PageTabsItemElement
         * @type {Page}
         */
        this.pageTab = opts.pageTab;

        this.initContent();

        return this;
    };

    return PageTabsItemElement.extend('PageTabsItemElement', {

        /**
         * Init page tabs item
         * @memberOf PageTabsItemElement
         */
        initContent: function initContent() {

            /**
             * Define local scope
             * @type {PageTabs}
             */
            var scope = this.view.scope;

            /**
             * Get prefs
             * @type {*}
             */
            var preferences = this.pageTab.model.getConfig('preferences');

            /**
             * Define title
             * @memberOf PageTabsItemElement
             * @type {*|string}
             */
            this.title = this.pageTab.model.getItemTitle();

            /**
             * Define description
             * @memberOf PageTabsItemElement
             * @type {*|string}
             */
            this.description = preferences.description;

            /**
             * Define pageUrl
             * @memberOf PageTabsItemElement
             * @type {*}
             */
            this.pageUrl = preferences.pageUrl;

            this.$.append(
                $('<div />').text(this.title)
            );

            this.setTitle(this.title);
            this.bindClick();
        },

        /**
         * Bind click to switch page
         * @memberOf PageTabsItemElement
         */
        bindClick: function bindClick() {

            this.$.on(
                'click.pageTab',
                this.clickCallback.bind(this)
            );
        },

        /**
         * Click callback
         * @memberOf PageTabsItemElement
         * @param e
         * @private
         */
        clickCallback: function clickCallback(e) {

            /**
             * Get scope
             * @type {PageTabs}
             */
            var scope = this.view.scope;

            scope.observer.publish(
                scope.eventManager.eventList.switchToPage,
                [this, e]
            );
        }

    }, BaseElement.prototype);
});