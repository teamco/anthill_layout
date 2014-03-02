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
     */
    var PageDataContentElement = function PageDataContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);

        this.bindShowPrefs();

        return this;
    };

    return PageDataContentElement.extend({

        /**
         * Define attributes
         * @param data
         */
        setAttributes: function setAttributes(data) {

            /**
             * Get config
             * @type {*}
             */
            var config= data.model.getConfig();

            this.$.attr({
                title: config.uuid
            }).addClass(config.resource);



        },

        /**
         * Bind show prefs
         */
        bindShowPrefs: function bindShowPrefs(resource) {

            this.$.off('click.prefs').on(
                'click.prefs',
                function clickPrefs() {

                    this.view.showPreferences(resource)

                }.bind(this)
            );
        }

    }, BaseElement.prototype);

});