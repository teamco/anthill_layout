/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function definePageDataContentElement(BaseElement) {

    /**
     * Define PageData Content Element
     * @param view
     * @param opts
     * @returns {PageDataContentElement}
     * @constructor
     * @class PageDataContentElement
     * @extends BaseElement
     */
    var PageDataContentElement = function PageDataContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);
        this.bindShowPrefs(opts.data);

        return this;
    };

    return PageDataContentElement.extend('PageDataContentElement', {

        /**
         * Define attributes
         * @memberOf PageDataContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            this.$.attr({
                title: config.uuid
            }).addClass(config.resource);

            this.$.css({
                backgroundImage: 'url("' + config.preferences.thumbnail + '")'
            });
        },

        /**
         * Bind show prefs
         * @memberOf PageDataContentElement
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