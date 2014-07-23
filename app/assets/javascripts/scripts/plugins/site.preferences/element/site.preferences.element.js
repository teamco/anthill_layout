/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element'
], function defineSitePreferencesElement(BaseElement) {

    /**
     * Define SitePreferences Element
     * @param view
     * @param opts
     * @returns {SitePreferencesElement}
     * @constructor
     * @class SitePreferencesElement
     * @extends BaseElement
     */
    var SitePreferencesElement = function SitePreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: false
        });

        /**
         * Define site width values
         * @member SitePreferencesElement
         * @type {number[]}
         */
        this.map = [960, 1024, 1040, 1140, 1280, 1920];

        this.addCSS('site.preferences');
        this.addCSS('preferences');

        return this;
    };

    return SitePreferencesElement.extend('SitePreferencesElement', {

        /**
         * Toggle fieldset
         * @member SitePreferencesElement
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
         * Get footer html
         * @member SitePreferencesElement
         * @returns {*|jQuery}
         */
        getFooter: function getFooter() {
            return $('<div />').text([
                this.base.lib.hash.hashLength({}),
                'items'
            ].join(' '));
        },

        /**
         * Get preferences HTML
         * @member SitePreferencesElement
         * @return string
         */
        getPreferencesHtml: function getPreferencesHtml() {

            var nodes = [];

            nodes.push(this.siteWidthSlider());

            return $('<ul />').append(nodes);
        },

        /**
         * Render static width
         * @member SitePreferencesElement
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
         * @member SitePreferencesElement
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
                width = $slider.slider('value'),
                checked = $input.prop('checked');

            if (checked) {

                $workspace.setWidth(this.map[width] || 0);
                $slider.slider('enable');

            } else {

                $workspace.unsetWidth();
                $slider.slider('disable');
            }
        },


        /**
         * Render width slider
         * @member SitePreferencesElement
         * @returns {*|jQuery}
         */
        siteWidthSlider: function siteWidthSlider() {

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

            this.renderSlider($slider, {

                value: sliderValue || 1,
                min: 0,
                max: this.map.length - 1,
                labels: this.map,
                disabled: !preferences.staticWidth,

                slide: function (event, ui) {

                    $textfield[1].val(ui.value);
                    $workspace.setWidth(this.map[ui.value]);

                }.bind(this)
            });

            return $('<li />').append(
                $('<fieldset />').append(
                    $('<legend />').addClass('open').text(cname).
                        on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: cname
                        }),

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
        }

    }, BaseElement.prototype);

});