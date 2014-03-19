/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element',
    'plugins/preferences/pages.preferences'
], function definePagesPreferencesElement(BaseElement, PagesPreferences) {

    /**
     * Define Pages Preferences Element
     * @param view
     * @param opts
     * @returns {PagesPreferencesElement}
     * @constructor
     * @class PagesPreferencesElement
     * @extends BaseElement
     * @extends PagesPreferences
     */
    var PagesPreferencesElement = function PagesPreferencesElement(view, opts) {

        this._config(view, opts, $('<ul />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.renderData(opts);

        return this;
    };

    return PagesPreferencesElement.extend('PagesPreferencesElement', {


    }, BaseElement.prototype, PagesPreferences.prototype);

});