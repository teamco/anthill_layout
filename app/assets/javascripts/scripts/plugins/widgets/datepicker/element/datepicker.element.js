/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineDatepickerElement(PluginElement) {

    /**
     * Define Datepicker Element
     * @param view
     * @param opts
     * @returns {DatepickerElement}
     * @constructor
     * @class DatepickerElement
     * @extends PluginElement
     */
    var DatepickerElement = function DatepickerElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('datepicker', {resource: '/widgets'});

        return this;
    };

    return DatepickerElement.extend('DatepickerElement', {

        /**
         * Render Embedded content
         * @memberOf DatepickerElement
         * @params {{showWeek: boolean, firstDay: string}} opts
         */
        renderEmbeddedContent: function renderEmbeddedContent(opts) {

            this.$.datepicker({
                showWeek: opts.showWeek,
                firstDay: opts.firstDay === 'Sunday' ? 0 : 1
            });
        }

    }, PluginElement.prototype);
});
