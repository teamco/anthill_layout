/**
 * Created with JetBrains RubyMine.
 * User: i061485
 * Date: 6/12/13
 * Time: 3:22 PM
 */

define([
], function defineLayoutEmptyRows() {

    /**
     * Define EmptyRows
     * @class EmptyRows
     * @param {Layout} layout
     * @constructor
     */
    var EmptyRows = function EmptyRows(layout) {

        /**
         * Define layout
         * @type {Layout}
         */
        this.layout = layout;

        this.page = layout.controller.getParent();

        this.allowed = layout.config.behavior.snap2grid.emptySpaces === 'row';

    };

    return EmptyRows.extend({

        findRows: function findRows() {
            var rows = [],
                widgets = this.page.model.getItems(),
                index, i;
            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    var widget = widgets[index];
                    for (i = widget.dom.row; i <= widget.dom.relHeight + widget.dom.row - 1; i += 1) {
                        rows[i] = this.layout.base.define(rows[i], [], true);
                        rows[i].push(widget);
                    }
                }
            }
            return rows;
        },

        /**
         *
         * @return {Boolean}
         */
        remove: function remove() {
            var layout = this.layout;
            if (!this.allowed) {
                layout.logger.warn('Remove empty spaces by row does not allowed');
                return false;
            }
            var rows = this.findRows(),
                moveIndex = 0,
                alreadyFixed = [],
                i = 0;
            for (i; i <= rows.length; i += 1) {
                if (layout.base.isDefined(rows[i])) {
                    var widgets = rows[i],
                        y = 0;
                    for (y; y <= widgets.length; y += 1) {
                        if (widgets[y]) {
                            var widget = widgets[y],
                                uuid = widget.model.getUUID();
                            if ($.inArray(uuid, alreadyFixed) === -1) {
                                alreadyFixed.push(uuid);
                                this.page.model.updateItem(
                                    uuid, {
                                        dom: {
                                            row: widget.dom.row - moveIndex
                                        }
                                    }
                                );
                            }
                        }
                    }
                } else {
                    moveIndex += 1;
                    alreadyFixed = [];
                }
            }
        }

    });

});