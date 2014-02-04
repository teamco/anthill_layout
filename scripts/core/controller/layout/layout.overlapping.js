/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 3/1/13
 * Time: 11:57 PM
 */

define([
    'controller/layout/layout.intersect'
], function defineLayoutOverlapping(Intersect) {

    /**
     * Define Overlapping
     * @class Overlapping
     * @extends {Intersect}
     * @param {Layout} layout
     * @constructor
     */
    var Overlapping = function Overlapping(layout) {

        /**
         * Define layout
         * @type {Layout}
         */
        this.layout = layout;
    };

    return Overlapping.extend({

        /**
         * Nested organizer
         * @param {{targets: Object, callback: Function}} opts
         * @returns {*}
         */
        nestedOrganizer: function nestedOrganizer(opts) {
            var layout = this.layout;

            opts = anthill.base.define(opts, {}, true);
            opts.targets = anthill.base.define(opts.targets, {}, true);

            if (!layout.controller.isOverlappingAllowed()) {
                layout.logger.debug('Overlapping is allowed');
                return this._nestedOrganizerCallback(opts.callback);
            }

            if (anthill.base.lib.hash.isHashEmpty(opts.targets)) {
                layout.logger.debug('Empty targets');
                return this._nestedOrganizerCallback(opts.callback);
            }

            layout.logger.debug('Starting nested organizer', opts);
            this.nestedOrganizer({
                targets: this._nestedOrganizerCore(opts.targets),
                callback: opts.callback
            });
        },

        /**
         * Nested organizer core
         * @param {{}} widgets
         * @private
         * @returns {{}}
         */
        _nestedOrganizerCore: function _nestedOrganizerCore(widgets) {
            var intersecting = {}, nestedMove = {},
                index, moved, widget;

            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    if (anthill.base.isDefined(widgets[index])) {
                        intersecting = this._intersectWidgets(widgets[index]);
                        this._organizeCollector(widgets[index], intersecting);
                        for (moved in intersecting) {
                            if (intersecting.hasOwnProperty(moved)) {
                                widget = intersecting[moved];
                                nestedMove[widget.model.getUUID()] = widget;
                                widget.view.elements.$widget.setOpacity(widget.config.html.opacity);
                            }
                        }
                    }
                }
            }

            return nestedMove;
        },

        /**
         * Nested organizer callback
         * @param {Function} [callback]
         * @private
         */
        _nestedOrganizerCallback: function _nestedOrganizerCallback(callback) {
            var layout = this.layout,
                emptySpaces = layout.controller.getBehavior().emptySpaces;
            if (emptySpaces) {
                layout.logger.debug('Remove empty spaces');
                switch (emptySpaces) {
                    case 'row':
                        layout.logger.debug('Remove empty rows');
                        layout.emptyRows.remove();
                        break;
                    case 'column':
                        layout.logger.debug('Remove empty columns');
                        layout.emptyColumns.remove();
                        break;

                }
            }

            this._cssOrganizer(callback);

            return true;
        },

        /**
         * Organize widget css
         * @private
         */
        _cssOrganizer: function _cssOrganizer(callback) {
            var page = this.layout.controller.getContainment(),
                widgets = page.items,
                index, widget, counter = 1,
                length = anthill.base.lib.hash.hashLength(widgets);

            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    widget = page.model.getItemByUUID(widgets[index].model.getUUID());

                    widget.logger.debug('Start nested organizer animation');
                    widget.view.elements.$widget._setPosition({
                        animate: true,
                        callback: this._cssOrganizeCallback.bind({
                            scope: this,
                            widget: widget,
                            callback: callback,
                            save: counter === length
                        })
                    });

                    counter += 1;
                }
            }
        },

        /**
         * Organize widget css callback
         * @private
         */
        _cssOrganizeCallback: function _cssOrganizeCallback() {

            var layout = this.scope.layout,
                callback = this.callback;

            if (anthill.base.isFunction(callback)) {
                layout.logger.debug('Execute callback', callback);
                callback();
            }

            this.widget.view.elements.$widget.setOpacity(1.0);

            if (this.save) {
                layout.logger.debug('Finish nested organizer');
                layout.observer.publish(layout.eventmanager.eventList.afterNestedOrganizer);
            }

        },

        /**
         * Organize collector
         * @param {{dom}} source
         * @private
         * @param {*} targets
         */
        _organizeCollector: function _organizeCollector(source, targets) {
            var index, layout = this.layout;

            for (index in targets) {
                if (targets.hasOwnProperty(index)) {
                    if (layout.controller.isSnap2Grid()) {

                        this._snap2gridOrganizer(
                            this.layout.controller.getBehavior(),
                            source,
                            targets[index],
                            this.layout.controller.getGridWidth()
                        );

                    } else if (layout.controller.isFreeStyle()) {
                        // TODO
                    } else {

                        this.layout.logger.warn(
                            'Undefined organize mode',
                            layout.controller.getBehaviorMode()
                        );
                    }
                }
            }
        },

        /**
         * Snap to grid organizer
         * @param {{organize}} behavior
         * @param {{dom}} source
         * @param {{map, dom}} widget
         * @param {Number} max
         * @private
         */
        _snap2gridOrganizer: function _snap2gridOrganizer(behavior, source, widget, max) {

            /**
             * Define local cell dims
             * @type {Number}
             */
            var cell = this.layout.controller.minCellWidth() + this.layout.config.grid.margin;

            /**
             * Organize by row
             * @param {{top: Number, bottom: Number, height: Number, row: Number, relHeight: Number, relBottom: Number}} dom
             * @param {{dom}} source
             * @param {{map}} widget
             * @private
             */
            function _organizeByRow(dom, source, widget) {
                dom.row = this.bottom(source.dom) + 1;
                dom.top = widget.map.widgetTop(dom.row);
                dom.bottom = dom.top + dom.height;
                dom.relHeight = widget.map.relHeight(dom.height, cell);
                dom.relBottom = widget.map.relBottom(dom.row, dom.relHeight);
            }

            if (behavior.organize === 'column') {
                var column = widget.dom.column,
                    left = widget.dom.left,
                    right = widget.dom.right;

                widget.dom.column = this.right(source.dom) + 1;
                widget.dom.left = widget.map.widgetLeft(widget.dom.column);

                widget.dom.right = widget.map.widgetRight(
                    widget.dom.left,
                    widget.dom.width
                );

                widget.dom.relWidth = widget.map.relWidth(widget.dom.width, cell);
                widget.dom.relRight = widget.map.relRight(widget.dom.column, widget.dom.relWidth);

                if (widget.dom.right >= max) {
                    widget.dom.column = column;
                    widget.dom.left = left;
                    widget.dom.right = right;

                    // Organize by row
                    _organizeByRow.bind(this)(widget.dom, source, widget);

                }
            } else if (behavior.organize === 'row') {

                // Organize by row
                _organizeByRow.bind(this)(widget.dom, source, widget);

            } else {

                this.layout.logger.warn('Undefined behavior organize', behavior.organize);

            }

        },

        /**
         * Get right position
         * @param {{column: Number, relWidth: Number}} target
         * @returns {number}
         */
        right: function right(target) {
            return (target.column + target.relWidth - 1);
        },

        /**
         * Get bottom position
         * @param {{row: Number, relHeight: Number}} target
         * @returns {number}
         */
        bottom: function bottom(target) {
            return (target.row + target.relHeight - 1);
        }

    }, Intersect.prototype);
});