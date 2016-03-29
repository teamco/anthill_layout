/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineMaximizeContentElement(PluginElement) {

    /**
     * Define Maximize Content Element
     * @param view
     * @param opts
     * @returns {MaximizeContentElement}
     * @constructor
     * @class MaximizeContentElement
     * @extends PluginElement
     * @extends Renderer
     */
    var MaximizeContentElement = function MaximizeContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });

        this.getTemplate(opts.data);
        this.setAttributes(opts.data);
        this.bindLocate(opts.data);
        this.bindMaximize(opts.data);

        return this;
    };

    return MaximizeContentElement.extend('MaximizeContentElement', {

        /**
         * Define inner content
         * @memberOf MaximizeContentElement
         * @param data
         */
        getTemplate: function getTemplate(data) {
            $('<a class="widget ' + data.model.getConfig('preferences').resource.toClassName() + '" href="#" />').
                appendTo(this.$);
        },
        /**
         * Define attributes
         * @memberOf MaximizeContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            var preferences = data.model.getConfig('preferences');

            /**
             * Get title
             * @type {boolean|string}
             */
            var title = data.model.getItemTitle();

            /**
             * Get description
             * @type {string}
             */
            var description = preferences.description || '';

            /**
             * Define data
             * @memberOf MaximizeContentElement
             * @type {{name: string, description: string}}
             */
            this.data = {
                name: title,
                description: description
            };

            this.renderTooltip({
                title: title,
                description: description,
                selector: this.$
            });
        },

        /**
         * Locate widget before showing prefs
         * @memberOf MaximizeContentElement
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
                scope.controller.locateElementItem.bind({
                    scope: scope,
                    uuid: data.model.getUUID()
                })
            );
        },

        /**
         * Bind maximize
         * @memberOf MaximizeContentElement
         * @param data
         */
        bindMaximize: function bindMaximize(data) {

            /**
             * Click maximize
             * @param {Event} e
             * @private
             */
            function _clickMaximize(e) {

                e.preventDefault();

                scope.observer.publish(
                    scope.eventmanager.eventList.defineInteraction,
                    data
                );
            }

            /**
             * Define scope
             * @type {Maximize}
             */
            var scope = this.view.scope;

            this.$.off('click.maximize').on(
                'click.maximize',
                _clickMaximize.bind(this)
            );
        }

    }, PluginElement.prototype);

});