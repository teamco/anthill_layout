/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWorkspaceDataContentElement(BaseElement) {

    /**
     * Define WorkspaceData Content Element
     * @constructor
     * @class WorkspaceDataContentElement
     * @param {WorkspaceDataView} view
     * @param opts
     * @extends BaseElement
     * @extends Renderer
     * @returns {WorkspaceDataContentElement}
     */
    var WorkspaceDataContentElement = function WorkspaceDataContentElement(view, opts) {

        this._config(view, opts, $('<li />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define page index
         * @type {number}
         */
        this.index = opts.counter;

        return this.init(opts.data);
    };

    return WorkspaceDataContentElement.extend('WorkspaceDataContentElement', {

        /**
         * Define init
         * @memberOf WorkspaceDataContentElement
         * @param {Page} page
         * @returns {WorkspaceDataContentElement}
         */
        init: function init(page) {

            this.setAttributes(page);
            this.setPublishOn(page);
            this.bindShowPrefs(page);

            this.renderCounter(page);

            /**
             * Define page reference
             * @type {Page}
             */
            this.page = page;

            /**
             * Define data
             * @memberOf WorkspaceDataContentElement
             * @type {{name: string, description: string}}
             */
            this.data = {
                name: page.model.getItemTitle(),
                description: page.model.getConfig('preferences').description || ''
            };

            return this;
        },

        /**
         * Render page widgets counter
         * @memberOf WorkspaceDataContentElement
         * @param {Page} page
         */
        renderCounter: function renderCounter(page) {
            this.$.append(
                $('<div />').addClass('counter')
            );

            this.updateCounter(page);
        },

        /**
         * Update counter text
         * @memberOf WorkspaceDataContentElement
         * @param {Page} page
         */
        updateCounter: function updateCounter(page) {

            /**
             * Get items length
             * @type {Number}
             */
            var items = this.base.lib.hash.hashLength(
                    page.model.getItems()
                ),
                preferences = page.model.getConfig('preferences') || {};

            this.get$counter().
                text(items).
                attr({
                    title: [items, 'items'].join(' ')
                });

            this.renderTooltip({
                title: page.model.getItemTitle(),
                description: [
                        preferences.description || '', '<br />',
                    '<span>uuid: </span>', page.model.getUUID(), '<br /><br />',
                    '<span>items: </span>', items, '<br />',
                    '<span>index: </span>', (
                        page.model.getConfig('preferences').order ||
                        page.model.getConfig('order'))
                ].join(''),
                $container: this
            });
        },

        /**
         * Define update $item if show in tabs
         * @memberOf WorkspaceDataContentElement
         * @param {boolean} show
         */
        updateShowInTabs: function updateShowInTabs(show) {
            this.$[(show ? 'remove' : 'add') + 'Class']('hide');
        },

        /**
         * Get page $counter
         * @memberOf WorkspaceDataContentElement
         * @returns {*|jQuery|HTMLElement}
         */
        get$counter: function get$counter() {
            return $('.counter', this.$);
        },

        /**
         * Define attributes
         * @memberOf WorkspaceDataContentElement
         * @param data
         */
        setAttributes: function setAttributes(data) {

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            this.$.attr({
                rel: config.uuid,
                title: data.model.getItemTitle()
            }).addClass(config.resource);
        },

        /**
         * Set publish on events
         * @memberOf WorkspaceDataContentElement
         * @param page
         */
        setPublishOn: function setPublishOn(page) {
            this.view.scope.controller.definePublisher(page);
        },

        /**
         * Bind show prefs
         * @memberOf WorkspaceDataContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Click prefs
             * @private
             */
            function _clickPrefs() {

                this.view.scope.observer.publish(
                    this.view.scope.eventManager.eventList.preparePreferences,
                    config
                );
            }

            /**
             * Get config
             * @type {*}
             */
            var config = data.model.getConfig();

            this.$.off('click.prefs').on(
                'click.prefs',
                _clickPrefs.bind(this)
            );
        }

    }, BaseElement.prototype);

});