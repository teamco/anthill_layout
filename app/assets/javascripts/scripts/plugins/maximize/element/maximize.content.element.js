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
        this.bindShowPrefs(opts.data);
        this.bindLocate(opts.data);

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
                        false,
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
             * @type {Maximize}
             */
            var scope = this.view.scope;

            this.$.off('mouseenter.prefs mouseleave.prefs').on(
                'mouseenter.prefs mouseleave.prefs',
                _locatePrefs.bind(this)
            );
        },

        /**
         * Bind show prefs
         * @memberOf MaximizeContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Click prefs
             * @private
             */
            function _clickPrefs() {
                scope.observer.publish(
                    scope.eventmanager.eventList.loadPreferences,
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
             * @type {Maximize}
             */
            var scope = this.view.scope;

            this.$.off('click.prefs').on(
                'click.prefs',
                _clickPrefs.bind(this)
            );
        }

    }, BaseElement.prototype);

});