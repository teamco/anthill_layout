/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSiteConfigContentElement(BaseElement) {

    /**
     * Define SiteConfig Content Element
     * @param view
     * @param opts
     * @returns {SiteConfigContentElement}
     * @constructor
     * @class SiteConfigContentElement
     * @type {function}
     * @extends BaseElement
     */
    var SiteConfigContentElement = function SiteConfigContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container
        });

        /**
         * Define page index
         * @type {number}
         */
        this.index = opts.counter;

        return this.init(opts.data);
    };

    return SiteConfigContentElement.extend('SiteConfigContentElement', {

        /**
         * Define inner content
         * @memberOf WorkspaceDataContentElement
         */
        getTemplate: function getTemplate() {
            $('<a class="site-config" href="#" />').
                appendTo(this.$);
        },

        /**
         * Define init
         * @memberOf SiteConfigContentElement
         * @param {{
         *      title: string,
         *      description: string,
         *      [event]: string
         * }} data
         * @returns {SiteConfigContentElement}
         */
        init: function init(data) {

            this.getTemplate();
            this.setAttributes(data);
            this.bindShowPrefs(data);

            /**
             * Define data
             * @property SiteConfigContentElement
             * @type {{name: string, description: string}}
             */
            this.data = {
                name: data.title,
                description: data.description
            };

            return this;
        },

        /**
         * Get page $counter
         * @memberOf SiteConfigContentElement
         * @returns {*|jQuery|HTMLElement}
         */
        get$counter: function get$counter() {
            return $('.counter', this.$);
        },

        /**
         * Define attributes
         * @memberOf SiteConfigContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            this.renderTooltip({
                title: data.title,
                description: data.description,
                selector: this.$
            });
        },

        /**
         * Bind show prefs
         * @memberOf SiteConfigContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Define scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope;

            /**
             * Click prefs
             * @private
             * @param e
             */
            function _clickPreferences(e) {

                /**
                 * Get event name
                 * @type {string}
                 */
                var event = scope.eventmanager.eventList[data.event];

                event ?
                    scope.observer.publish(event, data) :
                    scope.logger.warn(
                        'Undefined preferences event',
                        data.title,
                        data.event
                    );
            }

            this.$.off('click.config').on(
                'click.config',
                _clickPreferences.bind(this)
            );
        }
    }, BaseElement.prototype);
});