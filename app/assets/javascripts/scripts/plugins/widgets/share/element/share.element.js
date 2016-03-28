/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineShareElement(PluginElement) {

    /**
     * Define Share Element
     * @param view
     * @param opts
     * @returns {ShareElement}
     * @constructor
     * @class ShareElement
     * @extends PluginElement
     */
    var ShareElement = function ShareElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('share', {
            resource: '/widgets'
        });

        return this;
    };

    return ShareElement.extend('ShareElement', {

            /**
             * Render Embedded content
             * @memberOf ShareElement
             */
            renderEmbeddedContent: function renderEmbeddedContent() {

                /**
                 * Define share element
                 * @type {ShareElement}
                 */
                var $element = this;
                $element.view.controller.clearParentThumbnail();
                $element.$.append(
                    $('<div />').addClass('addthis_toolbox addthis_default_style')
                );

                require([
                    'http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5394b49751815288'
                ], function loadShareButtons() {

                    var addthis_config = {
                        data_track_addressbar: true
                    };

                    for (var i = 1; i < 5; i++) {
                        $element.$.find('.addthis_toolbox').
                            append('<a class="addthis_button_preferred_' + i + '"></a>');
                    }

                    $('.addthis_toolbox', $element.$).
                        append('<a class="addthis_button_compact"></a>').
                        append('<a class="addthis_counter addthis_bubble_style"></a>');
                });

            }

        },
        PluginElement.prototype);
});