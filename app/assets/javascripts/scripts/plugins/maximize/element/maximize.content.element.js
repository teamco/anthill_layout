/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineMaximizeContentElement(BaseElement) {

    /**
     * Define Maximize Content Element
     * @param view
     * @param opts
     * @returns {MaximizeContentElement}
     * @constructor
     * @class MaximizeContentElement
     * @extends BaseElement
     */
    var MaximizeContentElement = function MaximizeContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.setAttributes(opts.data);
        this.bindLocate(opts.data);
        this.bindMaximize(opts.data);

        return this;
    };

    return MaximizeContentElement.extend('MaximizeContentElement', {

        /**
         * Define attributes
         * @memberOf MaximizeContentElement
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
         * Locate widget before showing prefs
         * @member MaximizeContentElement
         * @param data
         */
        bindLocate: function bindLocate(data) {

            /**
             * Locate widget
             * @param event
             * @private
             */
            function _locatePrefs(event) {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadPreferences, [
                        {uuid: config.uuid},
                        event,
                        scope.controller.locateMaximize.bind(
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
             * @type {PageData}
             */
            var scope = this.view.scope;

            this.$.off('mouseenter.prefs mouseleave.prefs').on(
                'mouseenter.prefs mouseleave.prefs',
                _locatePrefs.bind(this)
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
             * @private
             */
            function _clickMaximize() {
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

    }, BaseElement.prototype);

});