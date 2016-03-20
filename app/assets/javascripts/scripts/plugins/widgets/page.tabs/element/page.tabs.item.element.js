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

        this._config(view, opts, $('<li role="presentation" />')).build({
            $container: opts.$container
        });

        /**
         * Define page tab item
         * @property PageTabsItemElement
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
             * Get prefs
             * @type {*}
             */
            var preferences = this.pageTab.model.getConfig('preferences');

            /**
             * Define title
             * @property PageTabsItemElement
             * @type {*|string}
             */
            this.title = this.pageTab.model.getItemTitle();

            /**
             * Define description
             * @property PageTabsItemElement
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
                $('<a />').attr({
                    title: this.title
                }).text(this.title)
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
                scope.eventmanager.eventList.switchToPage,
                [this, e]
            );
        }

    }, BaseElement.prototype);
});