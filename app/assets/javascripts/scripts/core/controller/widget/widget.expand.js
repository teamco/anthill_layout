/**
 * Created with RubyMine.
 * User: teamco
 * Date: 3/13/15
 * Time: 8:33 PM
 */

define(function defineWidgetExpand() {

    /**
     * Define WidgetExpand
     * @class WidgetExpand
     * @constructor
     */
    var WidgetExpand = function WidgetExpand() {
    };

    return WidgetExpand.extend('WidgetExpand', {

        /**
         * Get expandable
         * @member WidgetExpand
         * @returns {boolean}
         */
        isExpandable: function isExpandable() {

            /**
             * Get $content
             * @type {WidgetContent}
             */
            var $content = this.getContent();

            if (!this.base.isDefined($content)) {

                this.scope.logger.debug('Content undefined');
                return false;
            }

            /**
             * Get content height
             * @type {number}
             */
            var deltaHeight = $content.view.get$item().getHeight();

            return !!this.model.getConfig('preferences').expandable &&
                deltaHeight > this.scope.dom.height;
        },

        /**
         * Get expanded
         * @member WidgetExpand
         * @returns {boolean}
         */
        isExpanded: function isExpanded() {
            return !!this.scope.expanded;
        },

        /**
         * Set expanded
         * @member WidgetExpand
         * @param {boolean} expanded
         */
        setExpanded: function setExpanded(expanded) {
            return this.scope.expanded = !!expanded;
        },

        /**
         * Toggle content expander
         * @member WidgetExpand
         * @param {boolean} expand
         */
        toggleContentExpander: function toggleContentExpander(expand) {

            /**
             * Get $expander
             * @type {WidgetExpanderElement}
             */
            var $expander = this.view.elements.$expander,
                isDefined = $expander && this.base.isDefined($expander.$);

            if (expand) {

                if (isDefined) {

                    this.logger.debug('Expander already rendered');
                    return false;
                }

                this.view.contentExpander();

            } else {

                if (!isDefined) {

                    this.logger.debug('Expander should be rendered before destroy');
                    return false;
                }

                $expander.destroy();
                delete this.view.elements.$expander;
            }
        },

        /**
         * Define expand Content
         * @member WidgetExpand
         * @param e
         */
        expandContent: function expandContent(e) {

            if (this.controller.isConsumptionMode()) {

                this.logger.warn('Consumption mode feature', e);
                return false;
            }

            if (this.controller.isExpanded()) {

                this.observer.publish(
                    this.eventmanager.eventList.collapseContent
                );

                return false;
            }

            /**
             * Get $content
             * @type {WidgetContent}
             */
            var $content = this.controller.getContent(),
                deltaHeight = $content.view.get$item().getHeight();

            /**
             * Get $widget
             * @type {WidgetElement}
             */
            var $widget = this.view.get$item();

            $widget.setHeight(deltaHeight);
            $widget.view.elements.$expander.toggleExpandText(false);

            this.logger.debug('Expand content');
            this.controller.setExpanded(true);

            this.observer.publish(
                this.eventmanager.eventList.afterExpand
            );
        },

        /**
         * Define collapse Content
         * @member WidgetExpand
         * @param e
         */
        collapseContent: function collapseContent(e) {

            if (this.controller.isConsumptionMode()) {

                this.logger.warn('Consumption mode feature', e);
                return false;
            }

            if (!this.controller.isExpanded()) {

                this.logger.warn('Content not expanded');
                return false;
            }

            /**
             * Get $widget
             * @type {WidgetElement}
             */
            var $widget = this.view.get$item();

            $widget.setHeight(this.dom.height);
            $widget.view.elements.$expander.toggleExpandText(true);

            this.logger.debug('Collapse content');
            this.controller.setExpanded(false);

            this.observer.publish(
                this.eventmanager.eventList.afterExpand
            );
        },

        /**
         * Define after expand
         * @member WidgetExpand
         */
        afterExpand: function afterExpand() {

            this.logger.debug('After expand');

            /**
             * Get page
             * @type {Page}
             */
            var page = this.controller.getContainment();

            page.observer.publish(
                page.eventmanager.eventList.expandLayout,
                this
            );
        }
    });
});