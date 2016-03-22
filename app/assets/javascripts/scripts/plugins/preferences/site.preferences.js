/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/23/14
 * Time: 8:50 PM
 */

define([
    'jquery',
    'plugins/preferences/preferences'
], function defineSitePreferences($, BasePreferencesElement) {

    /**
     * Define prefs
     * @class SitePreferences
     * @extends Renderer
     * @extends BasePreferencesElement
     * @constructor
     */
    var SitePreferences = function SitePreferences() {
    };

    return SitePreferences.extend('SitePreferences', {

        /**
         * Get preferences HTML
         * @memberOf SitePreferences
         * @param {Array} map
         * @return Array
         */
        getPreferencesHtml: function getPreferencesHtml(map) {


            var $tabs = this.renderTabs(),
                $container = this.renderTabItemsContent(),
                text = 'Meta Data';

            this.$.append($tabs, $container);

            this.addTabItem($tabs, {
                uuid: 'meta_data',
                text: text,
                $container: $container,
                content: $('<ul class="default" />').append(
                    this.setSiteTitle(),
                    this.setSiteMetaAuthor(),
                    this.setSiteMetaDescription(),
                    this.setSiteMetaKeywords()
                )
            }, true);

            text = 'Global Preferences';
            this.addTabItem($tabs, {
                uuid: 'width_slider',
                text: text,
                $container: $container,
                content: this.siteWidthSlider(map)
            }, false);

            text = 'Google Analytics';
            this.addTabItem($tabs, {
                uuid: 'google_analytics',
                text: text,
                $container: $container,
                content: this.googleAnalytics()
            }, false);
        },

        /**
         * Set site title preference
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        setSiteTitle: function setSiteTitle() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                preferences = workspace.model.getConfig('preferences');

            /**
             * Get site title
             * @type {*|string}
             */
            var siteTitle = preferences['siteTitle'];

            /**
             * Split SEO title
             * @type {*|Array}
             */
            var seoTitle = workspace.view.get$item().getSiteTitle().split(
                workspace.model.getConfig('SEOSeparator')
            );

            /**
             * Render title
             * @type {*[]}
             */
            var $title = this.renderTextField({
                name: 'siteTitle',
                text: 'Title',
                disabled: false,
                placeholder: 'Enter title',
                visible: true,
                value: siteTitle || seoTitle[seoTitle.length - 1]
            });

            return $('<li />').addClass('workspace-title-prefs').append($title);
        },

        /**
         * Set site meta description
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        setSiteMetaDescription: function setSiteMetaDescription() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                preferences = workspace.model.getConfig('preferences');

            /**
             * Render description
             * @type {*[]}
             */
            var $description = this.renderTextArea({
                name: 'siteDescription',
                text: 'Description',
                disabled: false,
                placeholder: 'Enter description',
                visible: true,
                value: preferences['siteDescription'] || $('meta[name="description"]').attr('content')
            });

            return $('<li />').addClass('workspace-description-prefs').append($description);
        },

        /**
         * Set site meta key words
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        setSiteMetaKeywords: function setSiteMetaKeywords() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                preferences = workspace.model.getConfig('preferences');

            /**
             * Render description
             * @type {*[]}
             */
            var $keywords = this.renderTextArea({
                name: 'siteKeywords',
                text: 'Keywords',
                placeholder: 'Enter keywords',
                disabled: false,
                visible: true,
                value: preferences['siteKeywords'] || $('meta[name="keywords"]').attr('content')
            });

            return $('<li />').addClass('workspace-keywords-prefs').append($keywords);
        },

        /**
         * Set site meta author
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        setSiteMetaAuthor: function setSiteMetaAuthor() {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                preferences = workspace.model.getConfig('preferences');

            /**
             * Render description
             * @type {*[]}
             */
            var $author = this.renderTextField({
                name: 'siteAuthor',
                text: 'Author',
                placeholder: 'Enter author',
                disabled: false,
                visible: true,
                value: preferences['siteAuthor'] || $('meta[name="author"]').attr('content')
            });

            return $('<li />').addClass('workspace-author-prefs').append($author);
        },

        /**
         * Render static width
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        siteStaticWidth: function siteStaticWidth() {

            /**
             * Define index
             * @type {string}
             */
            var text = 'staticWidth';

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                preferences = workspace.model.getConfig('preferences'),
                checked = preferences[text];

            /**
             * Define checkbox
             * @type {CheckBoxRenderer}
             */
            var $element = this.renderCheckbox({
                name: text,
                text: text.humanize(),
                checked: checked,
                value: checked,
                disabled: false,
                visible: true,
                monitor: {
                    events: ['click.width'],
                    callback: this.toggleSlider.bind(this)
                }
            });

            return $('<li />').addClass([
                ['workspace', text.humanize().toClassName(), 'prefs'].join('-'),
                'checkbox'
            ].join(' ')).append($element);
        },

        /**
         * Enable/Disable slider
         * @memberOf SitePreferences
         * @param e
         */
        toggleSlider: function toggleSlider(e) {

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace();

            /**
             * Get $workspace
             * @type {WorkspaceElement}
             */
            var $workspace = workspace.view.get$item();

            var $input = $(e.target),
                $slider = $('.ui-slider', $input.parents('ul')),
                checked = $input.prop('checked');

            if (checked) {

                var width = $slider.slider('value') || 0;

                $workspace.updateWidth(width);
                $('input[name="siteWidthSlider"]', $slider.parent()).val(width);
                $slider.slider('enable');

            } else {

                $workspace.unsetWidth();
                $slider.slider('disable');
            }
        },

        /**
         * Render width slider
         * @memberOf SitePreferences
         * @param {Array} map
         * @returns {*|jQuery}
         */
        siteWidthSlider: function siteWidthSlider(map) {

            /**
             * Get scope
             * @type {SiteConfig}
             */
            var scope = this.view.scope;

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = scope.controller.getWorkspace();

            /**
             * Get w$workspace
             * @type {WorkspaceElement}
             */
            var $workspace = workspace.view.get$item();

            /**
             * Get site preferences
             * @type {{siteWidthSlider, staticWidth}}
             */
            var preferences = workspace.model.getConfig('preferences');

            var uuid = scope.base.lib.generator.UUID() + '-slider',
                $ul = $('<ul class="default site-width-slider" />'),
                $slider = $('<div />');

            /**
             * Get site slider value
             * @type {number}
             */
            var sliderValue = preferences.siteWidthSlider;

            /**
             * Render slider input
             * @type {TextFieldRenderer}
             */
            var $textfield = this.renderTextField({
                name: 'siteWidthSlider',
                disabled: false,
                visible: false,
                value: sliderValue
            });

            /**
             * Define on slide
             * @param event
             * @param ui
             * @private
             */
            function _slide(event, ui) {
                $textfield[1].val(ui.value);
                $workspace.updateWidth(ui.value);

                scope.logger.debug('On slide', event, ui);
            }

            this.renderSlider($slider, {
                value: sliderValue || 1,
                min: 0,
                max: map.length - 1,
                labels: map,
                disabled: !preferences.staticWidth,
                slide: _slide.bind(this)
            });

            $ul.append(
                this.siteStaticWidth(),
                $('<li class="workspace-site-width-prefs slider" />').append(
                    this.renderLabel(uuid, 'Site Width', 'slider', true),
                    $slider,
                    $textfield
                )
            );

            return $ul;
        },

        /**
         * Render Google Analytics
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        googleAnalytics: function googleAnalytics() {

            /**
             * Render slider input
             * @type {*[]}
             */
            var $textfield = this.renderTextField({
                name: 'trackingId',
                text: 'Tracking ID',
                placeholder: 'Paste Tracking ID here',
                disabled: false,
                visible: true,
                value: '',
                validate: {
                    mask: /^ua-\d{4,9}-\d{1,4}$/i,
                    blank: true
                }
            });

            return $('<ul class="default" />').append(
                $('<li class="workspace-google-analytics-prefs" />').append($textfield)
            );
        }

    }, BasePreferencesElement.prototype);
});