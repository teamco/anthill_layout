/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineWorkspaceDataElement(PluginElement) {

    /**
     * Define WorkspaceData Element
     * @param view
     * @param opts
     * @constructor
     * @class WorkspaceDataElement
     * @type {Function}
     * @extends PluginElement
     * @returns {WorkspaceDataElement}
     */
    var WorkspaceDataElement = function WorkspaceDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container
        });

        this.addCSS('workspace.data');
        this.addCSS('preferences');

        this.initSortable();

        return this;
    };

    return WorkspaceDataElement.extend('WorkspaceDataElement', {

        /**
         * Init sortable
         * @memberOf WorkspaceDataElement
         */
        initSortable: function initSortable() {

            this.$.sortable({
                containment: this.$container,
                cursor: 'move',
                distance: 5,
                items: '> li.page',
                opacity: 0.8,
                tolerance: 'pointer',
                stop: this._stopSortable.bind(this)
            });
        },

        /**
         * Stop sortable
         * @memberOf WorkspaceDataElement
         * @param event
         * @param ui
         * @private
         */
        _stopSortable: function _stopSortable(event, ui) {

            /**
             * Get scope
             * @type {WorkspaceData}
             */
            var scope = this.view.scope;

            scope.observer.publish(
                scope.eventmanager.eventList.updatePagesOrder,
                [this.$.sortable('toArray')]
            );

            ui.item.attr(
                'style',
                ui.item.attr('style').
                    replace(/position: relative;/, '')
            );
        }
    }, PluginElement.prototype);
});