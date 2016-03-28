/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWidgetRulesContentElement(BaseElement) {

    /**
     * Define WidgetRules Content Element
     * @param view
     * @param opts
     * @returns {WidgetRulesContentElement}
     * @constructor
     * @class WidgetRulesContentElement
     * @extends BaseElement
     * @extends Renderer
     */
    var WidgetRulesContentElement = function WidgetRulesContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });

        this.getTemplate(opts.data);
        this.setAttributes(opts.data);
        this.bindShowRules(opts.data);
        this.bindLocate(opts.data);

        return this;
    };

    return WidgetRulesContentElement.extend('WidgetRulesContentElement', {

        /**
         * Define inner content
         * @memberOf WidgetRulesContentElement
         */
        getTemplate: function getTemplate(data) {
            $('<a class="widget ' + data.model.getConfig('preferences').resource.toClassName() + '" />').
                appendTo(this.$);
        },

        /**
         * Define attributes
         * @memberOf WidgetRulesContentElement
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
             * Get description
             * @type {string}
             */
            var description = prefs.description || '';

            /**
             * Define data
             * @memberOf WidgetRulesContentElement
             * @type {{name: string, description: string}}
             */
            this.data = {
                name: title,
                description: description
            };

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
         * Locate widget before showing rules
         * @memberOf WidgetRulesContentElement
         * @param data
         */
        bindLocate: function bindLocate(data) {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.view.scope;

            // Get location event
            var locateOn = 'mouseenter.rules mouseleave.rules';

            this.$.off(locateOn).on(
                locateOn,
                this.view.controller.locateWidget.bind({
                    scope: this.view.scope,
                    uuid: data.model.getUUID()
                })
            );
        },

        /**
         * Bind show rules
         * @memberOf WidgetRulesContentElement
         * @param data
         */
        bindShowRules: function bindShowRules(data) {

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.view.scope;

            /**
             * Load stored rules
             * @private
             */
            function _loadStoredRules() {
                scope.controller.loadStoredRules(config.rules);
            }

            /**
             * Click prefs
             * @private
             * @param {Event} e
             */
            function _clickRules(e) {
                e.preventDefault();
                scope.observer.publish(
                    scope.eventmanager.eventList.loadDataRules,
                    [config, true, e, _loadStoredRules.bind(this)]
                );
            }

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            this.$.off('click.rules').on(
                'click.rules',
                _clickRules
            );
        }

    }, BaseElement.prototype);
});