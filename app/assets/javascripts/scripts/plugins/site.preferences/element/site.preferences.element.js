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
         * @param opts
         * @return string
         */
        getPreferencesHtml: function getPreferencesHtml(opts) {

            var nodes = [];

            nodes.push(this.siteWidthSlider());

            return $('<ul />').append(nodes);
        },

        siteWidthSlider: function siteWidthSlider() {

            /**
             * Define title
             * @type {string}
             */
            var cname = 'Global Preferences',
                uuid = this.base.lib.generator.UUID() + '-slider',
                $ul = $('<ul />').addClass('site-width-slider'),
                $slider = $('<div />');

            var $node = $('<li />').append(
                $('<fieldset />').append(
                    $('<legend />').text(cname).
                        on('click.toggle', this.toggleFieldset.bind(this)).attr({
                            title: cname
                        }),

                    $ul.append(
                        $('<li />').append(
                            this.renderLabel(uuid, 'Site Width', 'slider', true),
                            $slider
                        )
                    )
                )
            );

            this.renderSlider($slider, {
                value:100,
                min: 0,
                max: 500,
                step: 50,
                slide: function( event, ui ) {

                }
            });

            return $node;
        }



    }, BaseElement.prototype);

});