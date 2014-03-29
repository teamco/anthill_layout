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
        this.bindShowPrefs(opts.data);

        return this;
    };

    return WidgetRulesContentElement.extend('WidgetRulesContentElement', {

        /**
         * Define attributes
         * @memberOf WidgetRulesContentElement
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
         * @memberOf WidgetRulesContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Click prefs
             * @private
             */
            function _clickPrefs() {
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

            this.$.off('click.prefs').on(
                'click.prefs',
                _clickPrefs.bind(this)
            );
        }

    }, BaseElement.prototype);

});