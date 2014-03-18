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

        this.setAttributes(opts.data);
        this.bindShowPrefs(opts.data);

        return this;
    };

    return PagesContentElement.extend('PagesContentElement', {

        /**
         * Render page widgets counter
         * @memberOf PagesContentElement
         */
        renderCounter: function renderCounter() {
            this.$.append(
                $('<div />').addClass('counter')
            );
        },

        /**
         * Get page $counter
         * @returns {*|jQuery|HTMLElement}
         */
        get$counter: function get$counter() {
           return $('.counter', this.$);
        },

        /**
         * Define attributes
         * @memberOf PagesContentElement
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
         * Bind show prefs
         * @memberOf PagesContentElement
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