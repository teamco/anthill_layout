/**
 * Created with RubyMine.
 * User: i061485
 * Date: 2/27/14
 * Time: 5:40 PM
 */

define([
    'controller/widget/widget.expand',
    'controller/widget/widget.scroll',
    'controller/widget/widget.comment'
], function defineWidgetContent(WidgetExpand, WidgetScroll, WidgetComment) {

    /**
     * Define WidgetContent
     * @class WidgetContent
     * @extends {WidgetExpand} WidgetExpand
     * @extends {WidgetScroll} WidgetScroll
     * @extends {WidgetComment} WidgetComment
     * @constructor
     */
    var WidgetContent = function WidgetContent() {
    };

    return WidgetContent.extend(
        'WidgetContent', {

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
             * Show/Hide content
             * @member WidgetContent
             * @param {boolean} show
             */
            showContent: function showContent(show) {

                /**
                 * Get scope
                 * @type {Widget}
                 */
                var scope = this.scope;

                if (!(this.isDevelopmentMode() || this.isAuthorizeMode())) {
                    scope.logger.debug('Unable to toggle content', show);
                    return false;
                }

                /**
                 * Get prefs
                 * @type {*}
                 */
                var preferences = this.model.getConfig('preferences'),
                    fname = this.showContent.getCallerName(),
                    event;

                if (fname.match(/drag/i)) {
                    event = 'Drag';
                } else if (fname.match(/resizable/i)) {
                    event = 'Resize';
                }

                if (typeof(event) === 'undefined') {
                    scope.logger.warn('Undefined caller', fname);
                    return false;
                }

                // Define hide locals
                var hide = !!preferences['hideContentOn' + event],
                    force = this.isHideableContentArea();

                if (hide || force) {

                    // Get $content
                    var $content = this.get$content();

                    if ($content) {
                        show ? $content.show() : $content.hide();
                    }
                }
            },

            /**
             * Check if content should be force hide
             * @member WidgetContent
             * @returns {jQuery.length}
             */
            isHideableContentArea: function isHideableContentArea() {

                // Get $content
                var $content = this.get$content();

                if ($content) {
                    return $content.hasIframe() ||
                        $content.hasFlash();
                }
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
             * Get $content
             * @member WidgetContent
             * @returns {*}
             */
            get$content: function get$content() {

                // Get widget content
                var content = this.getContent();

                if (typeof(content) === 'undefined') {
                    this.scope.logger.debug('Undefined content');
                    return false;
                }

                // Get content $item
                var $content = content.view.get$item();

                this.scope.logger.debug('$content', $content);
                return $content;
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
            }
        },
        WidgetExpand.prototype,
        WidgetScroll.prototype,
        WidgetComment.prototype
    );
});