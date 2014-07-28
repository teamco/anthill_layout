/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineWorkspaceDataElement(BaseElement) {

    /**
     * Define WorkspaceData Element
     * @param view
     * @param opts
     * @constructor
     * @class WorkspaceDataElement
     * @type {Function}
     * @extends BaseElement
     * @returns {WorkspaceDataElement}
     */
    var WorkspaceDataElement = function WorkspaceDataElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        this.addCSS('workspace.data');
        this.addCSS('preferences');

        this.initSortable();

        return this;
    };

    return WorkspaceDataElement.extend('WorkspaceDataElement', {

        initSortable: function initSortable() {

            this.$.sortable({

                containment: this.$container.$,
                cursor: 'move',
                distance: 5,
                items: '> li.content',
                opacity: 0.8,
                tolerance: 'pointer',

                start: function startSort(event, ui) {

                    /**
                     * Get $item
                     * @type {WorkspaceDataContentElement}
                     */
                    var $item = this.view.elements.items[ui.helper.attr('id')];

                    $item.hideTooltip();

                }.bind(this)
            });
        },

        /**
         * Get footer html
         * @member WorkspaceDataElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength(
                    this.view.scope.controller.getData()
                ),
                'items'
            ].join(' '));
        }

    }, BaseElement.prototype);

});