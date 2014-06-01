/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
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
            this.get$counter().text(
                this.base.lib.hash.hashLength(
                    page.model.getItems()
                )
            );
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
                title: config.uuid
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