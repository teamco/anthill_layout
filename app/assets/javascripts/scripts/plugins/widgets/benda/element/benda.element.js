/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineBendaElement(PluginElement) {

    /**
     * Define Benda Element
     * @param view
     * @param opts
     * @returns {BendaElement}
     * @constructor
     * @class BendaElement
     * @extends PluginElement
     */
    var BendaElement = function BendaElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('benda', {resource: '/widgets'});

        return this;
    };

    return BendaElement.extend('BendaElement', {

        /**
         * Render Embedded content
         * @memberOf BendaElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            var profile = {
                "Name": "Pavel Maliy",
                "Nickname": "Super Pavel",
                "FairPlay Points": "48",
                "Rank": "341",
                "Position": "Defender/Middle Center/Left",
                "Foot": "Left",
                "Age": "14 Years old"
            };

            for (var index in profile) {

                if (profile.hasOwnProperty(index)) {
                    var $tmpl = $([
                        '<div class="input-group input-group-lg">',
                        '<span class="input-group-addon">', index, '</span>',
                        '<input type="text" value="', profile[index], '" class="form-control" placeholder="', index, '" aria-describedby="sizing-addon1">',
                        '</div>'
                    ].join(''));
                    
                    this.$.append($tmpl);
                }
            }
            
            this.addContent(
                '<div class="dropdown">'+
                  '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                    'Language'+
                  '</button>'+
                  '<div class="dropdown-menu" aria-labelledby="dropdownMenu1">'+
                    '<a class="dropdown-item" href="#">English</a>'+
                    '<a class="dropdown-item" href="#">Hebrew</a>'+
                    '<a class="dropdown-item" href="#">Arabic</a>'+
                  '</div>'+
                '</div>'
            );
        }

    }, PluginElement.prototype);
});
