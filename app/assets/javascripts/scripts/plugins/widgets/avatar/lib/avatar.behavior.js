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
            this.draggableInit = false;
        },

        initAvatarPosition: function initAvatarPosition() {

            if (localStorage.getItem('avatarX')) {
                var left = localStorage.getItem('avatarX'),
                    top = localStorage.getItem('avatarY');

                this.$avatarImage.css({
                    top: top + 'px',
                    left: left + 'px'
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
                    if(this.draggableInit) {
                        this.setDraggable(false);
                    }

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
                    this.draggableInit = true;
                    this.$avatarImage.draggable({
                        stop: function (event, ui) {
                            var top = $(this).offset().top;
                            var left = $(this).offset().left;
                            var parentTop = $('.bord').offset().top; //TODO replace .bord with existing object
                            var parentLeft = $('.bord').offset().left; //TODO replace .bord with existing object
                            localStorage.setItem('avatarX', left - parentLeft - 5);
                            localStorage.setItem('avatarY', top - parentTop - 5);
                        }
                    });
                }

            } else {
                this.$avatarImage.draggable('disable');
            }
        }
    });
});