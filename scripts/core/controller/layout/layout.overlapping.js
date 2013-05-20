/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 3/1/13
 * Time: 11:57 PM
 */

define([
    'modules/base'
], function defineLayoutOverlapping(Base) {

    /**
     * Define Overlapping
     * @class Overlapping
     * @extends {Base}
     * @param layout
     * @constructor
     */
    var Overlapping = function Overlapping(layout) {
        this.layout = layout;
    };

    return Overlapping.extend({
        /**
         * Nested organizer
         * @param {{targets: Object, callback: Function}} opts
         * @returns {*}
         */
        nestedOrganizer: function nestedOrganizer(opts) {
            var base = this.base;

            opts = base.define(opts, {}, true);
            opts.targets = base.define(opts.targets, {}, true);

            if (!this.layout.config.behavior.snap2grid.overlapping) {
                this.layout.logger.debug('Overlapping is allowed');
                return this._nestedOrganizerCallback(opts.callback);
            }

            if (base.lib.hash.isHashEmpty(opts.targets)) {
                this.layout.logger.debug('Empty targets');
                return this._nestedOrganizerCallback(opts.callback);
            }

            this.layout.logger.debug('Starting nested organizer');
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
                    if (this.base.isDefined(widgets[index])) {
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
            var emptySpaces = this.layout.config.behavior.snap2grid.emptySpaces;
            if (emptySpaces) {
                this.layout.logger.debug('Remove empty spaces');
                switch (emptySpaces) {
                    case 'row':
                        this.layout.logger.debug('Remove empty rows');
                        break;
                    case 'column':
                        this.layout.logger.debug('Remove empty columns');
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
            var page = this.layout.controller.getParent(),
                widgets = page.items,
                index, widget, counter = 1,
                length = this.base.lib.hash.hashLength(widgets);
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

            if (layout.base.isFunction(callback)) {
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
             * Organize by row
             * @param {{top: Number, bottom: Number, height: Number, row: Number}} dom
             * @param {{dom}} source
             * @param {{map}} widget
             * @private
             */
            function _organizeByRow(dom, source, widget) {
                dom.row = this.bottom(source.dom) + 1;
                dom.top = widget.map.widgetTop(dom.row);
                dom.bottom = dom.top + dom.height;
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
         * Check overlapping
         * @param {{left: Number, right: Number, bottom: Number, top: Number}} src
         * @param {{left: Number, right: Number, bottom: Number, top: Number}} target
         * @returns {boolean}
         * @private
         */
        _overlapped: function _overlapped(src, target) {

            if ((target.left > src.right || target.right < src.left) ||
                (target.top > src.bottom || target.bottom < src.top)) {
                this.layout.logger.debug('Overlap not possible', src, target);
                return false;
            }

            return (target.left > src.left && target.left < src.right) ||
                (target.right > src.left && target.right < src.right) ||
                (target.top > src.top && target.top < src.bottom) ||
                (target.bottom > src.top && target.bottom < src.bottom) ||
                (src.left > target.left && src.right < target.right &&
                    src.top > target.top && src.bottom < target.bottom) ||
                (src.left === target.left && src.right === target.right &&
                    src.top === target.top && src.bottom === target.bottom) ||
                (src.left === target.left && src.right === target.right &&
                    src.top >= target.top && src.bottom <= target.bottom) ||
                (src.left >= target.left && src.right <= target.right &&
                    src.top === target.top && src.bottom === target.bottom);
        },

        /**
         * Widget intersections
         * @param {{model, dom}} source
         * @private
         * @returns {{}}
         */
        _intersectWidgets: function _intersectWidgets(source) {
            var move = {}, index, target,
                partition = this.layout.controller.getParent().model.getItemsApartOf(source);

            for (index in partition) {
                if (partition.hasOwnProperty(index)) {
                    target = partition[index];
                    if (this._overlapped(source.dom, target.dom)) {
                        this.layout.logger.debug('Overlapped', target);
                        move[target.model.getUUID()] = target;
                    }
                }
            }
            return move;
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

    }, Base);
});