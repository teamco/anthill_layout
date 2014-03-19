/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePagesContentElement(BaseElement) {

    /**
     * Define Pages Content Element
     * @param view
     * @param opts
     * @returns {PagesContentElement}
     * @constructor
     * @class PagesContentElement
     * @extends BaseElement
     */
    var PagesContentElement = function PagesContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        return this.init(opts.data);
    };

    return PagesContentElement.extend('PagesContentElement', {

        /**
         * Define init
         * @memberOf PagesContentElement
         * @param page
         * @returns {PagesContentElement}
         */
        init: function init(page) {

            this.setAttributes(page);
            this.setPublishOn(page);
            this.bindShowPrefs(page);

            this.renderCounter(page);

            return this;
        },

        /**
         * Render page widgets counter
         * @member PagesContentElement
         * @param {Page} page
         */
        renderCounter: function renderCounter(page) {
            this.$.append(
                $('<div />').addClass('counter')
            );

            this.updateCounter(page);
        },

        /**
         * Update counter text
         * @member PagesContentElement
         * @param {Page} page
         */
        updateCounter: function updateCounter(page) {
            this.get$counter().text(
                this.base.lib.hash.hashLength(
                    page.model.getItems()
                )
            );
        },

        /**
         * Get page $counter
         * @member PagesContentElement
         * @returns {*|jQuery|HTMLElement}
         */
        get$counter: function get$counter() {
           return $('.counter', this.$);
        },

        /**
         * Define attributes
         * @member PagesContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            this.$.attr({
                rel: config.uuid,
                title: config.uuid
            }).addClass(config.resource);
        },

        /**
         * Set publish on events
         * @member PagesContentElement
         * @param page
         */
        setPublishOn: function setPublishOn(page) {
            this.view.scope.controller.definePublisher(page);
        },

        /**
         * Bind show prefs
         * @member PagesContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Click prefs
             * @private
             */
            function _clickPrefs() {
                this.view.showPreferences(config);
            }

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            this.$.off('click.prefs').on(
                'click.prefs',
                _clickPrefs.bind(this)
            );
        }

    }, BaseElement.prototype);

});