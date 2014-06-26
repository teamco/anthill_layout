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
     * @param view
     * @param opts
     * @returns {WorkspaceDataContentElement}
     * @constructor
     * @class WorkspaceDataContentElement
     * @extends BaseElement
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
         * @param page
         * @returns {WorkspaceDataContentElement}
         */
        init: function init(page) {

            this.setAttributes(page);
            this.setPublishOn(page);
            this.bindShowPrefs(page);

            this.renderCounter(page);

            return this;
        },

        /**
         * Render page widgets counter
         * @member WorkspaceDataContentElement
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
         * @member WorkspaceDataContentElement
         * @param {Page} page
         */
        updateCounter: function updateCounter(page) {

            /**
             * Get items length
             * @type {Number}
             */
            var items = this.base.lib.hash.hashLength(
                page.model.getItems()
            );

            this.get$counter().
                text(items).
                attr({
                    title: [items, 'items'].join(' ')
                });

            this.renderTooltip({
                title: page.model.getPrefs('title') || page.model.getUUID(),
                description: [
                    page.model.getPrefs('description') || '', '<br />',
                    '<span>uuid: </span>', page.model.getUUID(), '<br /><br />',
                    '<span>items: </span>', items, '<br />',
                    '<span>index: </span>', 0
                ].join(''),
                $container: this
            });
        },

        /**
         * Get page $counter
         * @member WorkspaceDataContentElement
         * @returns {*|jQuery|HTMLElement}
         */
        get$counter: function get$counter() {
            return $('.counter', this.$);
        },

        /**
         * Define attributes
         * @member WorkspaceDataContentElement
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
                title: data.model.getPrefs('title') || config.uuid
            }).addClass(config.resource);
        },

        /**
         * Set publish on events
         * @member WorkspaceDataContentElement
         * @param page
         */
        setPublishOn: function setPublishOn(page) {
            this.view.scope.controller.definePublisher(page);
        },

        /**
         * Bind show prefs
         * @member WorkspaceDataContentElement
         * @param data
         */
        bindShowPrefs: function bindShowPrefs(data) {

            /**
             * Click prefs
             * @private
             */
            function _clickPrefs() {

                /**
                 * Define view
                 * @type {WorkspaceDataView}
                 */
                var view = this.view;

                /**
                 * Define Workspace
                 * @type {Workspace}
                 */
                var workspace = view.controller.getWorkspace();

                view.showPreferences(config);

                workspace.observer.publish(
                    workspace.eventmanager.eventList.switchToPage,
                    view.scope.activeContent
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