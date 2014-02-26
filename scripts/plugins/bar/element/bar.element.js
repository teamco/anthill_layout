/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/element'
], function defineBarElement(BaseElement) {

    /**
     * Define Bar Element
     * @param view
     * @param opts
     * @returns {BarElement}
     * @constructor
     * @class BarElement
     */
    var BarElement = function BarElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        var url = this.pluginPath + '/gallery/gallery.css',
            uuid = this.$.attr('id') + '-css';

        this.addCSS(url, uuid);

        return this;
    };

    return BarElement.extend({

    }, BaseElement.prototype);

});