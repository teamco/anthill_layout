/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element',
    'plugins/preferences/widget.preferences'
], function defineHereMapsForLifePreferencesElement(PluginElement, WidgetPreferences) {

    /**
     * Define HereMapsForLife Preferences Element
     * @constructor
     * @class HereMapsForLifePreferencesElement
     * @param {HereMapsForLifeView} view
     * @param opts
     * @extends PluginElement
     * @extends WidgetPreferences
     * @returns {HereMapsForLifePreferencesElement}
     */
    var HereMapsForLifePreferencesElement = function HereMapsForLifePreferencesElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderBasePrefsData(opts.data);

        return this;
    };

    return HereMapsForLifePreferencesElement.extend(
        'HereMapsForLifePreferencesElement', {

            showLatitudeLongitude: function showLatitudeLongitude(pageData) {

                /**
                 * Get modal
                 * @type {ModalElement}
                 */
                var $modal = pageData.view.get$modal();

                var $ll = $('input[name="heremapsforlifeLatitudeLongitude"]', $modal.$),
                    $wrapper = $ll.closest('.here-maps-for-life-prefs'),
                    isVisible = $ll.is(':visible');

                $wrapper[(isVisible ? 'add' : 'remove') + 'Class']('hidden').find('div > *')[(isVisible ? 'add' : 'remove') + 'Class']('hide')[(isVisible ? 'hide' : 'show')]();
            }
        },
        PluginElement.prototype,
        WidgetPreferences.prototype
    );
});
