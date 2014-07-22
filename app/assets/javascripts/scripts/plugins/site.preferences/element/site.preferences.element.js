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
             * Define checkbox
             * @type {*[]}
             */
            var $element = this.renderCheckbox({
                name: text,
                text: text.humanize(),
                checked: false,
                value: false,
                disabled: false,
                visible: true,
                monitor: {
                    events: ['click.width'],
                    callback: this.toggleSlider
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

            var $input = $(e.target),
                $slider = $('.ui-slider', $input.parents('ul')),
                checked = $input.prop('checked');

            $slider.slider('option', checked ? 'enabled' : 'disabled');
        },

        /**
         * Render width slider
         * @member SitePreferencesElement
         * @returns {*|jQuery}
         */
        siteWidthSlider: function siteWidthSlider() {

            /**
             * Define title
             * @type {string}
             */
            var cname = 'Global Preferences',
                uuid = this.base.lib.generator.UUID() + '-slider',
                $ul = $('<ul />').addClass('site-width-slider'),
                $slider = $('<div />');

            /**
             * Render slider input
             * @type {*[]}
             */
            var $textfield = this.renderTextField({
                name: 'siteWithSlider',
                disabled: true,
                visible: false
            });

            /**
             * Define site width values
             * @type {number[]}
             */
            var map = [960, 1024, 1040, 1140, 1280, 1920];

            /**
             * Get workspace
             * @type {Workspace}
             */
            var workspace = this.view.controller.getWorkspace(),
                $workspace = workspace.view.elements.$workspace;

            this.renderSlider($slider, {
                value: 1,
                min: 0,
                max: map.length - 1,
                disabled: true,
                slide: function (event, ui) {

                    $($textfield, 'input').val(ui.value);

                    /**
                     * Get class name
                     * @type {string}
                     */
                    var style = $workspace.$.attr('class').replace(
                        /sw-\d{3,4}/, 'sw-' + map[ui.value]
                    );

                    $workspace.$.attr('class', style);
                }
            });

            return $('<li />').append(
                $('<fieldset />').append(
                    $('<legend />').text(cname).
                        on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: cname
                        }),

                    $ul.append(
                        this.siteStaticWidth()
                    ),

                    $ul.append(
                        $('<li class="site-width-prefs slider" />').append(
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