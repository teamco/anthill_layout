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
//                return this.nestedOrganizerCallback(opts.callback);
            }

            if (base.lib.hash.isHashEmpty(opts.targets)) {
                this.layout.logger.info('Empty targets');
//                return this.nestedOrganizerCallback(opts.callback);
            }

            this.layout.logger.info('Starting nested organizer');
            this.nestedOrganizer({
                targets: this.nestedOrganizerCore(opts.targets),
                callback: opts.callback
            });
        },
        nestedOrganizerCore: function nestedOrganizerCore(widgets) {
            var intersecting = {}, nestedMove = {},
                index, moved;

            for (index in widgets) {
                if (widgets.hasOwnProperty(index)) {
                    if (this.base.isDefined(widgets[index])) {
                        intersecting = this.intersectWidgets(widgets[index]);
                        this.organizeCollector(widgets[index].dom, intersecting);
                        for (moved in intersecting) {
                            if (intersecting.hasOwnProperty(moved)) {
                                nestedMove[intersecting[moved].uuid] = intersecting[moved];
                            }
                        }
                    }
                }
            }

            return nestedMove;
        },

        organizeCollector: function organizeCollector(source, targets) {
            var index;
            for (index in targets) {
                if (targets.hasOwnProperty(index)) {
                    targets[index].row = this.bottom(source) + 1;
                }
            }
        },

        intersectCenter: function intersectCenter(src, target) {
            return this.intersectHorizontal(target, src) &&
                this.intersectVertical(target, src);
        },

        /**
         *
         * @param src
         * @param target
         * @return {Boolean}
         */
        intersectUnique: function intersectUnique(src, target) {
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
         *
         * @param src
         * @param target
         * @return {Boolean}
         */
        intersectHorizontal: function intersectHorizontal(src, target) {
            return (
                (src.column <= this.right(target) &&
                    this.right(src) >= this.right(target)) ||
                    (src.column <= target.column &&
                        this.right(src) >= target.column)
                );
        },

        /**
         *
         * @param src
         * @param target
         * @return {Boolean}
         */
        intersectVertical: function intersectVertical(src, target) {
            return (
                (src.row <= target.row &&
                    this.bottom(src) >= target.row) ||
                    (src.row <= this.bottom(target) &&
                        this.bottom(src) >= this.bottom(target))
                );
        },

        /**
         * End intersections logic
         */
        intersectWidgets: function intersectWidgets(source) {
            var move = {}, index, target,
                base = this.base,
                widgets = base.lib.hash.partitionHA({
                    src: source,
                    map: this.layout.page.model.getItems(),
                    key: 'uuid',
                    where: 'config'
                }),
                intersected = base.lib.array.arrayHashSortByKey(widgets[1], 'row', false, true);

            for(index in intersected) {
                if (intersected.hasOwnProperty(index)) {
                    target = intersected[index];
                    if (
                        (this.intersectHorizontal(source, target) &&
                            this.intersectVertical(source, target)) ||
                            this.intersectUnique(source, target) ||
                            this.intersectCenter(source, target)
                        ) {
                        move[target.uuid] = target;
                    }
                }
            }
            return move;
        },
        right: function right(target) {
            return (target.column + target.relWidth - 1);
        },
        bottom: function bottom(target) {
            return (target.row + target.relHeight - 1);
        }

    }, Base);
});