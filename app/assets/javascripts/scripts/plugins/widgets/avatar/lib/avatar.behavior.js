define([

], function defineAvatarBehavior() {

    /**
     * Define Avatar Behavior
     * @class AvatarBehavior
     * @constructor
     */
    var AvatarBehavior = function AvatarBehavior() {

    };

    return AvatarBehavior.extend('AvatarBehavior', {

        /**
         * Define avatar config functionality selectors
         * @member AvatarBehavior
         */
        defineSelectors: function defineSelectors() {
            this.$avContainer = $('.bord', this.$);
            this.$avatarImage = $('.imageFrame img', this.$);
            this.$imageDraggMenu = $('.dragMenu', this.$);
            this.$underLayerMenu = $('.under_layer', this.$);
            this.$allowDraggingButton = $('.dragIt', this.$);
            this.$changeAvatarButton = $('.changeAvatarButton', this.$);
        },

        initAvatarPosition: function initAvatarPosition() {

            if (localStorage.getItem('avatarX')) {

                var top = localStorage.getItem('avatarX'),
                    left = localStorage.getItem('avatarY');

                avatarImage.offset({
                    top: top,
                    left: left
                });
            }
        },

        bindConfig: function bindConfig() {

            this.$avContainer.mouseenter(
                function mouseEnter() {

                    this.$underLayerMenu.addClass('extend_menu');
                    this.$imageDraggMenu.addClass('extend');

                }.bind(this)
            );

            this.$avContainer.mouseleave(
                function mouseLeave() {

                    this.$underLayerMenu.removeClass('extend_menu');
                    this.$imageDraggMenu.removeClass('extend');

                    this.setDraggable(false);

                }.bind(this)
            );

            this.$changeAvatarButton.on(
                'click.changeAvatar',
                function changeAvatar() {
                    this.$avatarImage.attr('src', "images.jpg");
                }.bind(this)
            );

            this.$allowDraggingButton.on(
                'click.allowDrag',
                function allowDrag() {

                    this.setDraggable(true);
                    this.$imageDraggMenu.removeClass('extend');

                }.bind(this)
            );
        },

        setDraggable: function setDraggable(drag) {

            if (drag) {

                if (this.$avatarImage.data('ui-draggable')) {

                    this.$avatarImage.draggable('enable');

                } else {

                    this.$avatarImage.draggable({
                        stop: function (event, ui) {
                            var top = $(this).offset().top;
                            var left = $(this).offset().left;
                            localStorage.setItem('avatarX', top);
                            localStorage.setItem('avatarY', left);
                        }
                    });
                }

            } else {

                this.$avatarImage.draggable('disable');
            }
        }
    });
});