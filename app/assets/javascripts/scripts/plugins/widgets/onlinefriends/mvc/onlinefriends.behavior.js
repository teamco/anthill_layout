define([], function defineOnlineFriendsBehavior() {
    var OnlineFriendsBehavior = function OnlineFriendsBehavior() {

        this.mainContainer = $('.mainContainer');
        this.rowsContiner = $('.friendsRowsContainer');
        this.viewAllmenu = $('.viewAllMenu');
        this.scrollContent = $('.scrollableContent');
        this.onlineUsersAmount = $('.online_amount');


        this.friendsData = [
            {
                'id': '564647',
                'name': 'Spike',
                'image': 'cat.jpg'
            },
            {
                'id': '035353',
                'name': 'Gucci',
                'image': 'cat.jpg'
            },
            {
                'id': '839467',
                'name': 'Newfoundland',
                'image': 'cat.jpg'
            },
            {
                'id': '232376',
                'name': 'Sima',
                'image': 'cat.jpg'
            },
            {
                'id': '784097',
                'name': 'Rich',
                'image': 'cat.jpg'
            },
            {
                'id': '850680',
                'name': 'Spoon',
                'image': 'cat.jpg'
            },
            {
                'id': '224423',
                'name': 'Sasha',
                'image': 'cat.jpg'
            },
            {
                'id': '857657',
                'name': 'Lessi',
                'image': 'cat.jpg'
            },
            {
                'id': '749988',
                'name': 'Booch',
                'image': 'cat.jpg'
            },
            {
                'id': '878949',
                'name': 'Stiker',
                'image': 'cat.jpg'
            }
        ];

        this.initialize();

    };

    return OnlineFriendsBehavior.extend('OnlineFriendsBehavior', {

        initialize: function initialize() {
            for (var i = 0; i < this.friendsData.length; i++) {
                this.rowsContiner.append([
                    '<li><img id="',
                    this.friendsData[i].id,
                    '" src="../../assets/scripts/plugins/widgets/onlinefriends/mvc/',
                    this.friendsData[i].image,
                    '" title="Click to visit"><label>',
                    this.friendsData[i].name,
                    '</label></li>'
                ].join(''));
            }
            
            this.onlineUsersAmount.text(this.friendsData.length);

            this.mainContainer.on('mouseenter', function () {

                this.viewAllmenu.addClass('extended');

            }.bind(this));

            this.mainContainer.on('mouseleave', function () {

                this.viewAllmenu.removeClass('extended');

            }.bind(this));

            this.scrollContent.niceScroll({
                cursorcolor: "rgba(136, 136, 136, 0.3)"
            });
        }

    });
});