/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 3/1/13
 * Time: 11:57 PM
 */

define([
    'modules/base'
], function defineLayoutOverlapping(Base) {

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
                this.layout.logger.info('Overlapping is allowed');
                return this._nestedOrganizerCallback(opts.callback);
            }

            if (base.lib.hash.isHashEmpty(opts.targets)) {
                this.layout.logger.info('Empty targets');
                return this._nestedOrganizerCallback(opts.callback);
            }

            this.layout.logger.info('Starting nested organizer');
            this.nestedOrganizer({
                targets: this.nestedOrganizerCore(opts.targets),
                callback: opts.callback
            });
        },
        /**
         * Nested organizer core
         * @param {{}} widgets
         * @returns {{}}
         */
        nestedOrganizerCore: function nestedOrganizerCore(widgets) {
            var intersecting = {}, nestedMove = {},
                index, moved;

            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    if (this.base.isDefined(widgets[index])) {
                        intersecting = this.intersectWidgets(widgets[index]);
                        this.organizeCollector(widgets[index], intersecting);
                        for (moved in intersecting) {
                            if (intersecting.hasOwnProperty(moved)) {
                                nestedMove[intersecting[moved].model.getUUID()] = intersecting[moved];
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

            if (this.save) {
                layout.logger.debug('Finish nested organizer');
            }

        },
        /**
         * Organize collector
         * @param {{dom}} source
         * @param {*} targets
         */
        organizeCollector: function organizeCollector(source, targets) {
            var index;
            for (index in targets) {
                if (targets.hasOwnProperty(index)) {
                    targets[index].dom.row = this.bottom(source.dom) + 1;
                }
            }
        },
        /**
         * Widget intersect: center
         * @param {{row, column}} src
         * @param {{row, column}} target
         * @returns {*}
         * @private
         */
        _intersectCenter: function _intersectCenter(src, target) {
            return this._intersectHorizontal(target, src) &&
                this._intersectVertical(target, src);
        },
        /**
         * Widget intersect: unique
         * @param {{right, row, column}} src
         * @param {{right, row, column}} target
         * @returns {boolean}
         * @private
         */
        _intersectUnique: function _intersectUnique(src, target) {
            return (
                src.column <= target.column &&
                    target.right <= src.right &&
                    src.row >= target.row &&
                    this.bottom(src) <= this.bottom(target)
                ) || (
                src.column >= target.column &&
                    src.right <= target.right &&
                    src.row <= target.row &&
                    this.bottom(src) >= this.bottom(target)
                );
        },
        /**
         * Widget intersect: horizontal
         * @param {{column}} src
         * @param {{column}} target
         * @returns {boolean}
         * @private
         */
        _intersectHorizontal: function _intersectHorizontal(src, target) {
            return (
                (src.column <= this.right(target) &&
                    this.right(src) >= this.right(target)) ||
                    (src.column <= target.column &&
                        this.right(src) >= target.column)
                );
        },
        /**
         * Widget intersect: vertical
         * @param {{row}} src
         * @param {{row}} target
         * @returns {boolean}
         * @private
         */
        _intersectVertical: function _intersectVertical(src, target) {
            return (
                (src.row <= target.row &&
                    this.bottom(src) >= target.row) ||
                    (src.row <= this.bottom(target) &&
                        this.bottom(src) >= this.bottom(target))
                );
        },
        /**
         * Widget intersections
         * @param {{model, dom}} source
         * @returns {{}}
         */
        intersectWidgets: function intersectWidgets(source) {
            var move = {}, index, target,
                partition = this.layout.controller.getParent().model.getItemsApartOf(source);

            for (index in partition) {
                if (partition.hasOwnProperty(index)) {
                    target = partition[index];
                    if (this._intersectUnique(source.dom, target.dom) ||
                        this._intersectCenter(source.dom, target.dom)) {
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