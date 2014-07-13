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
         * @member PageTabsItemElement
         * @type {Page}
         */
        this.pageTab = opts.pageTab;

        this.initContent();

        return this;
    };

    return PageTabsItemElement.extend('PageTabsItemElement', {

        /**
         * Init page tabs item
         * @member PageTabsItemElement
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
             * @member PageTabsItemElement
             * @type {*|string}
             */
            this.title = scope.base.define(
                preferences.title,
                this.pageTab.model.getUUID(),
                true
            );

            /**
             * Define description
             * @member PageTabsItemElement
             * @type {*|string}
             */
            this.description = preferences.description;

            /**
             * Define pageUrl
             * @member PageTabsItemElement
             * @type {*}
             */
            this.pageUrl = preferences.pageUrl;

            this.$.append(
                $('<div />').text(this.title)
            );

            this.setTitle(this.title);

            this.$.on('click.pageTab', function (e) {

                var scope = this.view.scope;

                scope.observer.publish(
                    scope.eventmanager.eventList.switchToPage,
                    [this, e]
                );

            }.bind(this))
        }

    }, BaseElement.prototype);
});