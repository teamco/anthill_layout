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
         * Toggle fieldset
         * @memberOf SitePreferences
         * @param e
         */
        toggleFieldset: function toggleFieldset(e) {

            /**
             * Define $el
             * @type {*|jQuery|HTMLElement}
             */
            var $el = $(e.target);

            $el.parents('div.html').
                find('.open').
                removeClass('open');

            $el.addClass('open');

            this.adoptModalDialogPosition();
        },

        /**
         * Get preferences HTML
         * @memberOf SitePreferences
         * @param {Array} map
         * @return Array
         */
        getPreferencesHtml: function getPreferencesHtml(map) {

            return [
                this.setSiteMetaData(),
                this.siteWidthSlider(map),
                this.googleAnalytics()
            ];
        },

        setSiteMetaData: function setSiteMetaData() {

            return $('<li />').append(
                this.renderFieldSet(
                    'Meta Data',
                    $('<ul />').append(
                        this.setSiteTitle(),
                        this.setSiteMetaAuthor(),
                        this.setSiteMetaDescription(),
                        this.setSiteMetaKeywords()
                    ),
                    true
                )
            );

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

            return $('<li />').
                addClass('workspace-title-prefs').
                append($title);
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

            return $('<li />').
                addClass('workspace-description-prefs').
                append($description);
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

            return $('<li />').
                addClass('workspace-keywords-prefs').
                append($keywords);
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

            return $('<li />').
                addClass('workspace-author-prefs').
                append($author);
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
             * @type {*[]}
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

            return $('<li />').
                addClass([
                    ['workspace', text.humanize().toClassName(), 'prefs'].join('-'),
                    'checkbox'
                ].join(' ')).
                append($element);
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
            var workspace = this.view.controller.getWorkspace(),
                $workspace = workspace.view.elements.$workspace;

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
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                $workspace = workspace.view.elements.$workspace,
                preferences = workspace.model.getConfig('preferences');

            /**
             * Define title
             * @type {string}
             */
            var cname = 'Global Preferences',
                uuid = this.base.lib.generator.UUID() + '-slider',
                $ul = $('<ul />').addClass('site-width-slider'),
                $slider = $('<div />');

            /**
             * Get site slider value
             * @type {number}
             */
            var sliderValue = preferences.siteWidthSlider;

            /**
             * Render slider input
             * @type {*[]}
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

                this.view.scope.logger.debug('On slide', event, ui);
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

            return $('<li />').append(
                this.renderFieldSet(cname, $ul)
            );
        },

        /**
         * Render Google Analytics
         * @memberOf SitePreferences
         * @returns {*|jQuery}
         */
        googleAnalytics: function googleAnalytics() {

            /**
             * Define title
             * @type {string}
             */
            var cname = 'Google Analytics';

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

            return $('<li />').append(
                this.renderFieldSet(
                    cname,
                    $('<ul />').append(
                        $('<li class="workspace-google-analytics-prefs" />').
                            append($textfield)
                    )
                )
            )
        }

    }, BasePreferencesElement.prototype);
});