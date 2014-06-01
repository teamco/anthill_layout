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
            destroy: false
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
         * Init page tabs item
         * @member PageTabsItemElement
         */
        initContent: function initContent() {

            /**
             * Define title
             * @member PageTabsItemElement
             * @type {*|string}
             */
            this.title = this.view.controller.getPreference('title') ||
                'Default';

            /**
             * Define description
             * @member PageTabsItemElement
             * @type {*|string}
             */
            this.description = this.view.controller.getPreference('description');

            /**
             * Define pageUrl
             * @member PageTabsItemElement
             * @type {*}
             */
            this.pageUrl = this.view.controller.getPreference('pageUrl');

            this.$.append(
                $('<div />').text(this.title)
            );

            this.setTitle(this.title);

            this.$.on('click.pageUrl', function (e) {

                if (this.pageUrl) {

                    this.view.scope.logger.debug('Open url', e);
                    window.open(this.pageUrl);

                } else {

                    this.view.controller.switchTo(this.pageTab);
                }

            }.bind(this))
        }

    }, BaseElement.prototype);
});