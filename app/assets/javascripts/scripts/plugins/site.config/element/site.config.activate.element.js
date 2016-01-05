/**
 * Created by teamco on 7/31/14.
 */

define([
    'modules/Element'
], function defineSiteConfigActivateElement(BaseElement) {

    /**
     * Define SiteConfigActivateElement
     * @class SiteConfigActivateElement
     * @constructor
     * @param {SiteConfigView} view
     * @param opts
     * @extends BaseElement
     * @returns {SiteConfigActivateElement}
     */
    var SiteConfigActivateElement = function SiteConfigActivateElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container
        });

        this.renderContent();

        return this;
    };

    return SiteConfigActivateElement.extend('SiteConfigActivateElement', {

        /**
         * Render content
         * @memberOf SiteConfigActivateElement
         */
        renderContent: function renderContent() {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope,
                root = scope.controller.root(),
                storage = root.model.setting.storage,
                modes = [];

            for (var index in storage) {
                if (storage.hasOwnProperty(index)) {
                    modes.push({
                        type: 'text',
                        key: index,
                        value: index
                    });
                }
            }

            var $ul = $('<ul />');

            /**
             * Define combo
             * @type {*|jQuery}
             */
            var $combo = $('<li />').addClass('site-mode').append(
                this.renderCombobox(
                    modes,
                    root.model.getConfig('mode'),
                    'Mode',
                    'author_site_type[name]',
                    undefined,
                    true,
                    true
                )
            );

            this.$.append(
                $ul.append($combo)
            );
        }

    }, BaseElement.prototype);
});