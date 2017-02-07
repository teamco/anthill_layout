define(function defineAvatarBehavior() {

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
     * @memberOf AvatarBehavior
     */
    defineSelectors: function defineSelectors() {

      /**
       * Define $avContainer
       * @memberOf AvatarBehavior
       */
      this.$avContainer = $('.bord', this.$);

      /**
       * Define $avatarImage
       * @memberOf AvatarBehavior
       */
      this.$avatarImage = $('.imageFrame img', this.$);

      /**
       * Define $imageDraggMenu
       * @memberOf AvatarBehavior
       */
      this.$imageDraggMenu = $('.dragMenu', this.$);

      /**
       * Define $underLayerMenu
       * @memberOf AvatarBehavior
       */
      this.$underLayerMenu = $('.under_layer', this.$);

      /**
       * Define $allowDraggingButton
       * @memberOf AvatarBehavior
       */
      this.$allowDraggingButton = $('.dragIt', this.$);

      /**
       * Define $changeAvatarButton
       * @memberOf AvatarBehavior
       */
      this.$changeAvatarButton = $('.changeAvatarButton', this.$);

      /**
       * Define draggableInit
       * @memberOf AvatarBehavior
       */
      this.draggableInit = false;
    },

    /**
     * Define init position
     * @memberOf AvatarBehavior
     */
    initAvatarPosition: function initAvatarPosition() {

      var left = this.coordinates.x || 0,
          top = this.coordinates.y || 0;

      this.$avatarImage.css({
        top: top + 'px',
        left: left + 'px'
      });
    },

    /**
     * Define bind cfg
     * @memberOf AvatarBehavior
     */
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
            if (this.draggableInit) {
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

    /**
     * Define draggable
     * @memberOf AvatarBehavior
     */
    setDraggable: function setDraggable(drag) {

      /**
       * Define element
       * @type {AvatarElement}
       */
      var $element = this,
          scope = $element.view.scope,
          borderWidth = 5;

      if (drag) {

        if (this.$avatarImage.data('ui-draggable')) {

          this.$avatarImage.draggable('enable');

        } else {

          this.draggableInit = true;

          this.$avatarImage.draggable({

            stop: function stop(event, ui) {

              var top = $(this).offset().top,
                  left = $(this).offset().left,
                  parentTop = $element.$avContainer.offset().top,
                  parentLeft = $element.$avContainer.offset().left;

              scope.observer.publish(
                  scope.eventmanager.eventList.updateCoordinates, [
                    left - parentLeft - borderWidth,
                    top - parentTop - borderWidth
                  ]
              );
            }
          });
        }

      } else {

        this.$avatarImage.draggable('disable');
      }
    }
  });
});