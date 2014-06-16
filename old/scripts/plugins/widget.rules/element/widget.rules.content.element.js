/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineWidgetRulesContentElement(BaseElement) {

    /**
     * Define WidgetRules Content Element
     * @param view
     * @param opts
     * @returns {WidgetRulesContentElement}
     * @constructor
     * @class WidgetRulesContentElement
     * @extends BaseElement
     */
    var WidgetRulesContentElement = function WidgetRulesContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);
        this.bindShowRules(opts.data);
        this.bindLocate(opts.data);

        return this;
    };

    return WidgetRulesContentElement.extend('WidgetRulesContentElement', {

        /**
         * Define attributes
         * @member WidgetRulesContentElement
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
            }).addClass(
                config.preferences.resource.replace(/\./g, '')
            );

            if (config.preferences.thumbnail.length > 0) {

                this.$.css({
                    backgroundImage: 'url("' + config.preferences.thumbnail + '")'
                });
            }
        },

        /**
         * Locate widget before showing rules
         * @member WidgetRulesContentElement
         * @param data
         */
        bindLocate: function bindLocate(data) {

            /**
             * Locate widget
             * @param event
             * @private
             */
            function _locateRules(event) {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadRules, [
                        {uuid: config.uuid},
                        false,
                        event,
                        scope.controller.locateWidgetRules.bind(
                            scope.controller
                        )
                    ]
                );
            }

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.view.scope;

            this.$.off('mouseenter.rules mouseleave.rules').on(
                'mouseenter.rules mouseleave.rules',
                _locateRules.bind(this)
            );
        },

        /**
         * Bind show rules
         * @member WidgetRulesContentElement
         * @param data
         */
        bindShowRules: function bindShowRules(data) {

            /**
             * Load stored rules
             * @private
             */
            function _loadStoredRules() {
                this.view.controller.loadStoredRules(config.rules);
            }

            /**
             * Click prefs
             * @private
             * @param e
             */
            function _clickRules(e) {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadRules,
                    [config, true, e, _loadStoredRules.bind(this)]
                );
            }

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            /**
             * Define scope
             * @type {WidgetRules}
             */
            var scope = this.view.scope;

            this.$.off('click.rules').on(
                'click.rules',
                _clickRules.bind(this)
            );
        }

    }, BaseElement.prototype);

});