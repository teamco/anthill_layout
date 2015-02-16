/**
 * Created with RubyMine.
 * User: teamco
 * Date: 7/23/14
 * Time: 8:50 PM
 */

define([
    'jquery',
    'plugins/preferences/preferences'
], function defineSitePreferences($, BasePreferences) {

    /**
     * Define prefs
     * @class SitePreferences
     * @extends Renderer
     * @extends BasePreferences
     * @constructor
     */
    var SitePreferences = function SitePreferences() {

    };

    return SitePreferences.extend('SitePreferences', {

        /**
         * Toggle fieldset
         * @member SitePreferences
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
         * @member SitePreferences
         * @param {Array} map
         * @return Array
         */
        getPreferencesHtml: function getPreferencesHtml(map) {

            return [
                this.setSiteTitle(),
                this.setSiteMetaDescription(),
                this.setSiteMetaKeywords(),
                this.setSiteMetaAuthor(),
                this.siteWidthSlider(map),
                this.googleAnalytics()
            ];
        },

        /**
         * Set site title preference
         * @member SitePreferences
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
             * Render title
             * @type {*[]}
             */
            var $title = this.renderTextField({
                name: 'siteTitle',
                text: 'Site Title',
                disabled: false,
                visible: true,
                value: preferences['siteTitle'] || $('title').text()
            });

            return $('<li />').
                addClass('workspace-title-prefs').
                append($title);
        },

        /**
         * Set site meta description
         * @member SitePreferences
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
                text: 'Site Description',
                disabled: false,
                visible: true,
                value: preferences['siteDescription'] || $('meta[name="description"]').attr('content')
            });

            return $('<li />').
                addClass('workspace-description-prefs').
                append($description);
        },

        /**
         * Set site meta key words
         * @member SitePreferences
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
                text: 'Site Keywords',
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
         * @member SitePreferences
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
                text: 'Site Author',
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
         * @member SitePreferences
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
         * @member SitePreferences
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
         * @member SitePreferences
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

            return $('<li />').append(
                $('<fieldset />').append(
                    $('<legend />').addClass('open').text(cname).
                        on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: cname
                        }
                    ),

                    $ul.append(
                        this.siteStaticWidth()
                    ),

                    $ul.append(
                        $('<li class="workspace-site-width-prefs slider" />').append(
                            this.renderLabel(uuid, 'Site Width', 'slider', true),
                            $slider,
                            $textfield
                        )
                    )
                )
            );
        },

        /**
         * Render Google Analytics
         * @member SitePreferences
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
                $('<fieldset />').append(
                    $('<legend />').text(cname).
                        on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: cname
                        }
                    ),

                    $('<ul />').append(
                        $('<li class="workspace-google-analytics-prefs" />').append(
                            $textfield
                        )
                    )
                )
            );
        }

    }, BasePreferences.prototype);
});