/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/Element'
], function defineExpander(BaseElement) {

    /**
     * Define content
     * @param {WidgetView} view
     * @param opts
     * @returns {WidgetExpanderElement}
     * @class WidgetExpanderElement
     * @constructor
     * @extends BaseElement
     */
    var WidgetExpanderElement = function WidgetExpanderElement(view, opts) {

        if (view.controller.isExpandable()) {

            this._config(view, opts, $('<div />')).build({
                $container: opts.$container,
                destroy: true
            });

            this.toggleExpandText(true);
            this.bindExpander();
        }

        return this;
    };

    return WidgetExpanderElement.extend('WidgetExpanderElement', {

        /**
         * Define bind Expander
         * @memberOf WidgetExpanderElement
         */
        bindExpander: function bindExpander() {

            /**
             * Get scope
             * @type {Widget}
             */
            var scope = this.view.scope;

            this.$.on('click.expand', function expand(e) {

                scope.observer.publish(
                    scope.eventmanager.eventList.expandContent,
                    e
                );
            });
        },

        /**
         * Define text toggle
         * @memberOf WidgetExpanderElement
         * @param {boolean} expand
         */
        toggleExpandText: function toggleExpandText(expand) {

            this.setText(
                expand ?
                    this.i18n.t('expand.widget') :
                    this.i18n.t('collapse.widget')
            );
        }

    }, BaseElement.prototype);
});