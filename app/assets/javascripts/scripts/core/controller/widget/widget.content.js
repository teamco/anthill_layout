/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/27/14
 * Time: 5:40 PM
 */

define([
    'config/anthill'
], function defineWidgetContent(AntHill) {

    /**
     * Define WidgetContent
     * @class WidgetContent
     * @extends AntHill
     * @constructor
     */
    var WidgetContent = function WidgetContent() {
    };

    return WidgetContent.extend('WidgetContent', {

        /**
         * Define load widget data
         * @member WidgetContent
         */
        loadWidgetData: function loadWidgetData() {

            /**
             * Get local scope
             * @type {Widget}
             */
            var scope = this.scope;

            /**
             * Get widget page
             * @type {Workspace}
             */
            var workspace = this.getWorkspace();

            /**
             * Get current page
             * @type {Page}
             */
            var page = workspace.controller.isLoadPageContent();

            if (page) {

                scope.observer.batchPublish(
                    scope.eventmanager.eventList.loadContent,
                    scope.eventmanager.eventList.loadPreferences
                );

                scope.logger.debug('Content start loading');
            }
        },

        /**
         * Load widget content
         * @member WidgetContent
         */
        loadContent: function loadContent() {

            /**
             * Define widget instance
             * @type {Widget}
             */
            var widget = this;

            /**
             * Get resource
             * @type {string}
             */
            var resource = widget.model.getConfig('preferences').resource;

            if (!this.base.isString(resource)) {
                widget.logger.error('Unable to load resource');
                return false;
            }

            /**
             * Define resource path
             * @type {string}
             */
            var path = [
                '../../scripts/plugins/widgets',
                ('/' + resource).repeat(2)
            ].join('');

            require([path], function getDependencies(Content) {

                widget.observer.publish(
                    widget.eventmanager.eventList.setContent,
                    [Content, {
                        events: widget.contentEvents || {},
                        rules: widget.contentRules || {}
                    }]
                );

                widget.logger.debug('Content finish loading');
            });
        },

        /**
         * Set content
         * @member WidgetContent
         * @param {Function} Content
         * @param {{}} [opts]
         */
        setContent: function setContent(Content, opts) {

            /**
             * Define content
             * @member WidgetContent
             * @type {*}
             */
            this.content = new Content(this, opts);

            this.observer.publish(
                this.eventmanager.eventList.afterSetContent,
                opts
            );
        },

        /**
         * Define after set content
         * @member WidgetContent
         * @param {{}} [opts]
         */
        afterSetContent: function afterSetContent(opts) {
            this.logger.debug('After set content', this.content, opts);
            this.view.contentExpander();
        },

        /**
         * Get content
         * @member WidgetContent
         * @returns {*}
         */
        getContent: function getContent() {
            return this.scope.content;
        },

        /**
         * Clear thumbnail bg
         * @member WidgetContent
         */
        clearThumbnail: function clearThumbnail() {
            this.view.get$item().clearBackground();
        },

        /**
         * Adopt widget dimension on resize page
         * @member WidgetContent
         * @param {Boolean} animate
         */
        adoptDimensions: function adoptDimensions(animate) {
            this.map.adoptTo(animate);
        },

        /**
         * Get widget thumbnail
         * @member WidgetContent
         * @returns {*}
         */
        getThumbnail: function getThumbnail() {
            return this.model.getConfig('preferences').thumbnail;
        },

        /**
         * Get widget resource
         * @member WidgetContent
         * @returns {string}
         */
        getResource: function getResource() {
            return this.model.getConfig('preferences').resource;
        },

        /**
         * Get expandable
         * @member WidgetContent
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
         * @member WidgetContent
         * @returns {boolean}
         */
        isExpanded: function isExpanded() {
            return !!this.scope.expanded;
        },

        /**
         * Set expanded
         * @member WidgetContent
         * @param {boolean} expanded
         */
        setExpanded: function setExpanded(expanded) {
            return this.scope.expanded = !!expanded;
        },

        /**
         * Toggle content expander
         * @member WidgetContent
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
         * @member WidgetContent
         * @param e
         */
        expandContent: function expandContent(e) {

            if (!this.controller.isConsumptionMode()) {

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
        },

        /**
         * Define collapse Content
         * @member WidgetContent
         * @param e
         */
        collapseContent: function collapseContent(e) {

            if (!this.controller.isConsumptionMode()) {

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
        },

        /**
         * Define scroll content
         * @member WidgetContent
         * @param {boolean} scrollable
         */
        scrollContent: function scrollContent(scrollable) {

            /**
             * Define css action
             * @type {string}
             */
            var action = (scrollable ? 'add' : 'remove') + 'Class';

            this.view.get$item().$[action]('scroll');
        },

        /**
         * Define commentable content
         * @member WidgetContent
         * @param {boolean} commentable
         */
        commentableContent: function commentableContent(commentable) {

            commentable ?
                this.view.contentComments() :
                this.view.$comments.destroy();
        }

    }, AntHill.prototype);
});