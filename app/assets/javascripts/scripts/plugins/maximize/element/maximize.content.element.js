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
     * @extends Renderer
     */
    var MaximizeContentElement = function MaximizeContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addInnerContent();
        this.setAttributes(opts.data);
        this.bindLocate(opts.data);
        this.bindMaximize(opts.data);

        return this;
    };

    return MaximizeContentElement.extend('MaximizeContentElement', {

        /**
         * Define inner content
         * @member MaximizeContentElement
         */
        addInnerContent: function addInnerContent() {
            this.$.append('<div />');
        },

        /**
         * Define attributes
         * @member MaximizeContentElement
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

            this.$.attr({
                title: title
            }).addClass(
                this.view.controller.getResourceClassName(
                    preferences.resource
                )
            );

            /**
             * Define data
             * @member MaximizeContentElement
             * @type {{name: string, description: string}}
             */
            this.data = {
                name: title,
                description: description
            };

            this.renderTooltip({
                title: title,
                description: description,
                $container: this
            });
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
         * @member MaximizeContentElement
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