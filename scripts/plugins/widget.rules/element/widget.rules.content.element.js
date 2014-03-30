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
            }).addClass(config.resource);

            this.$.css({
                backgroundImage: 'url("' + config.preferences.thumbnail + '")'
            });
        },

        /**
         * Bind show rules
         * @member WidgetRulesContentElement
         * @param data
         */
        bindShowRules: function bindShowRules(data) {

            /**
             * Click prefs
             * @private
             */
            function _clickRules() {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadRules,
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