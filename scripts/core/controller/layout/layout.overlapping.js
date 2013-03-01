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
                this.layout.logger.info('Overlapping is available');
                return this.nestedOrganizerCallback(opts.callback);
            }

            if (base.lib.hash.isHashEmpty(opts.targets)) {
                this.layout.logger.info('Empty targets');
                return this.nestedOrganizerCallback(opts.callback);
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
                        this.organizeCollector(widgets[index], intersecting);
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
                    this.layout.page.model.addWidgetToCollector(targets[index]);
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
            var move = {},
                widgets = App.base.partitionHA({
                    src: source,
                    map: this.layout.page.collector,
                    key: 'uuid'
                });
            jQuery.each(
                App.sort.arrayHashSortByKey(widgets[1], 'row', false, true),
                function intersectWidgetsLoop(k, target) {
                    if (
                        (this.intersectHorizontal(source, target) &&
                            this.intersectVertical(source, target)) ||
                            this.intersectUnique(source, target) ||
                            this.intersectCenter(source, target)
                        ) {
                        move[target.uuid] = target;
                    }
                }.bind(this));
            return move;
        }


    }, Base);
});