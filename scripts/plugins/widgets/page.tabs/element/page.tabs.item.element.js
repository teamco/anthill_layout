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
            this.init();
        },

        /**
         * Set title
         * @member PageTabsItemElement
         */
        setTitle: function setTitle() {

            /**
             * Define title
             * @member PageTabsItemElement
             * @type {*}
             */
            this.title = this.view.controller.getPreference('title');
        },

        /**
         * Set description
         * @member PageTabsItemElement
         */
        setDescription: function setDescription() {

            /**
             * Define description
             * @member PageTabsItemElement
             * @type {*}
             */
            this.description = this.view.controller.getPreference('description');
        },

        /**
         * Set page external url
         * @member PageTabsItemElement
         */
        setPageUrl: function setPageUrl() {

            /**
             * Define pageUrl
             * @member PageTabsItemElement
             * @type {*}
             */
            this.pageUrl = this.view.controller.getPreference('pageUrl');
        },

        /**
         * Init page tabs item
         * @member PageTabsItemElement
         */
        init: function init() {

            this.setTitle();
            this.setDescription();
            this.setPageUrl();

            this.$.append(
                $('<div />').attr({
                    title: this.title,
                    description: this.description
                })
            );

            if (this.pageUrl) {

                this.$.on('click.pageUrl', function (e){

                    this.view.scope.logger.debug('Open url', e);
                    window.open(this.pageUrl);

                }.bind(this))

            } else {

                this.view.controller.switchTo(this.pageTab);
            }
        }



    }, BaseElement.prototype);

});