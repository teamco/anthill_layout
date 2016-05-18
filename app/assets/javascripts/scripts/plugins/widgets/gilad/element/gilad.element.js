/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'plugins/plugin.element'
], function defineGiladElement(PluginElement) {

    /**
     * Define Gilad Element
     * @param view
     * @param opts
     * @returns {GiladElement}
     * @constructor
     * @class GiladElement
     * @extends PluginElement
     */
    var GiladElement = function GiladElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('gilad', {resource: '/widgets'});

        return this;
    };

    return GiladElement.extend('GiladElement', {

        /**
         * Render Embedded content
         * @memberOf GiladElement
         */
        renderEmbeddedContent: function renderEmbeddedContent() {

            var stadiums = [
                {
                    "id": "0",
                    "Name": "Fairness Game",
                    "Location": "She'erit Yisra'el St, Tel Aviv-Yafo, 61084",
                    "creator": "Yossi",
                    "Average Rank": "8",
                    "Participants": "4",
                    "thumb": "http://www.neighborhoodnotes.com/uploads/images/posts/0/8/8231/8DCA90C3-1D09-3519-AD0902D07EC04F0E.jpg"
                },
                {
                    "id": "5",
                    "Name": "Volunteers game",
                    "Location": "Eyal's home, Beit Jann, 32.964672, 35.373207",
                    "creator": "Eyal",
                    "Average Rank": "8",
                    "Participants": "5",
                    "thumb": "http://myhero.com/images/g1/hero105394/HondurasSoccer5.jpg"
                },
                {
                    "id": "1",
                    "Name": "The neighborhood game",
                    "Location": "Al-Kurum St 6 Nazareth",
                    "creator": "Jawad",
                    "Average Rank": "8",
                    "Participants": "6",
                    "thumb": "http://www.stevecurtiskc.com/wp-content/uploads/2016/01/IMG_1997w.jpg"
                },
                {
                    "id": "2",
                    "Name": "FairnessGame",
                    "Location": "She'erit Yisra'el St, Tel Aviv-Yafo, 61084",
                    "creator": "David",
                    "Average Rank": "7",
                    "Participants": "6",
                    "thumb": "http://oaklandvoices.us/wp-content/uploads/2013/01/Healthy-of-the-Hood-2-Healthy-015.jpg"
                },
                {
                    "id": "3",
                    "Name": "Championship game",
                    "Location": "Midron Yaffo Park, Tel Aviv-Yafo, 32.047827, 34.747473",
                    "creator": "George",
                    "Average Rank": "8",
                    "Participants": "7",
                    "thumb": "http://oaklandvoices.us/wp-content/uploads/2013/01/Healthy-of-the-Hood-2-Healthy-033.jpg"
                },
                {
                    "id": "4",
                    "Name": "Peace team",
                    "Location": "Histadrut, Akko, 32.926697, 35.072156",
                    "creator": "Muhammad",
                    "Average Rank": "7",
                    "Participants": "4",
                    "thumb": "http://richmondsfblog.com/wp-content/uploads/2015/11/fields1.jpg"
                }
            ];

            this.$.append('<ul class="stadiums"/>');

            var $ul = this.$.find('ul');

            for (var i = 0, l = stadiums.length; i < l; i++) {
                var $li = $([
                    '<li>',
                    '<img src="' + stadiums[i]['thumb'] + '"/>',
                    '<div>',
                    '<strong>Name: </strong>' + stadiums[i]['Name'],
                    '<br /><strong>Location: </strong>' + stadiums[i]['Location'],
                    '<br /><strong>Facilitator: </strong>' + stadiums[i]['creator'],
                    '<br /><strong>Average Rank: </strong>' + stadiums[i]['Average Rank'],
                    '<br /><strong>Participants: </strong>' + stadiums[i]['Participants'],
                    '</div>',
                    '</li>'
                ].join(''));

                $ul.append($li.off().on(
                    'click.stadium',
                    function() {
                        window.location.hash = '/current-game';
                    }
                ));
            }
        }

    }, PluginElement.prototype);
});
