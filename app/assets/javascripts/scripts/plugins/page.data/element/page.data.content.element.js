/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function definePageDataContentElement(BaseElement) {

    /**
     * Define PageData Content Element
     * @param view
     * @param opts
     * @returns {PageDataContentElement}
     * @constructor
     * @class PageDataContentElement
     * @extends BaseElement
     * @extends Renderer
     */
    var PageDataContentElement = function PageDataContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });

        this.getTemplate(opts.data);
        this.setAttributes(opts.data);
        this.bindShowPrefs(opts.data);
        this.bindLocate(opts.data);

        return this;
    };

    return PageDataContentElement.extend('PageDataContentElement', {

        /**
         * Define inner content
         * @memberOf PageDataContentElement
         */
        getTemplate: function getTemplate(data) {
            $('<a class="widget ' + data.model.getConfig('preferences').resource.toClassName() + '" />').appendTo(this.$);
        },

        /**
         * Define attributes
         * @memberOf PageDataContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            /**
             * Get title
             * @type {boolean|string}
             */
            var title = data.model.getItemTitle();

            /**
             * Get prefs
             * @type {{description: string, resource: string}}
             */
            var prefs = data.model.getConfig('preferences');

            /**
             * Define data
             * @memberOf PageDataContentElement
             * @type {{name: string, description: string}}
             */
            this.data = {
                name: title,
                description: prefs.description
            };

            /**
             * Get description
             * @type {string}
             */
            var description = prefs.description || '';

            this.$.attr({
                title: title
            }).addClass(
                this.view.controller.getResourceClassName(
                    prefs.resource
                )
            );

            this.renderTooltip({
                title: title,
                description: description,
                selector: this.$
            });
        },

        /**
         * Locate widget before showing prefs
         * @memberOf PageDataContentElement
         * @param data
         */
        bindLocate: function bindLocate(data) {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.view.scope;
            
            // Get location event
            var locateOn = 'mouseenter.prefs mouseleave.prefs';

            this.$.off(locateOn).on(
                locateOn,
                scope.controller.locateWidget.bind({
                    scope: scope,
                    uuid: data.model.getUUID()
                })
            );
        },

        /**
         * Bind show prefs
         * @memberOf PageDataContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Click prefs
             * @param {Event} event
             * @private
             */
            function _clickPrefs(event) {

                event.preventDefault();

                scope.observer.publish(
                    scope.eventmanager.eventList.prepareActiveComponent,
                    [config, true]
                );
            }

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            /**
             * Define scope
             * @type {PageData}
             */
            var scope = this.view.scope;

            this.$.off('click.prefs').on(
                'click.prefs',
                _clickPrefs.bind(this)
            );
        }

    }, BaseElement.prototype);
});