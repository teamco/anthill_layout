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
    };

    return EmptyRows.extend({

        findRows: function findRows() {
            var rows = [],
                widgets = this.layout.controller.getParent().model.getItems(),
                index, i;
            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    var widget = widgets[index];
                    for (i = widget.row; i <= widget.relHeight + widget.row - 1; i++) {
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
            if (!this.layout.config.overlapping.removeEmptySpaces) {
                return false;
            }
            var rows = this.findRows(),
                moveIndex = 0,
                alreadyFixed = [],
                i;
            for (i = 0; i <= rows.length; i++) {
                if (App.base.isDefined(rows[i])) {
                    var widgets = rows[i],
                        y;
                    for (y = 0; y <= widgets.length; y++) {
                        if (widgets[y]) {
                            var uuid = widgets[y].uuid;
                            // TODO Check incorrect ID
                            if (jQuery.inArray(uuid, alreadyFixed) === -1) {
                                alreadyFixed.push(uuid);
                                this.page.model.updateCollectorByKey({
                                    uuid: uuid,
                                    key: 'row',
                                    value: this.page.model.getWidgetFromCollector(uuid).row - moveIndex
                                });
                            }
                        }
                    }
                } else {
                    moveIndex++;
                    alreadyFixed = [];
                }
            }
        }

    });

});