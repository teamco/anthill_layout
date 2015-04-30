/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define([
    'modules/Element',
    'plugins/widgets/avatar/lib/avatar.behavior'
], function defineAvatarElement(BaseElement, AvatarBehavior) {

    /**
     * Define Avatar Element
     * @param view
     * @param opts
     * @returns {AvatarElement}
     * @constructor
     * @class AvatarElement
     * @extends BaseElement
     */
    var AvatarElement = function AvatarElement(view, opts) {

        this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });

        this.addCSS('avatar', {
            resource: '/widgets'
        });

        /**
         * Define default image
         * @memberOf AvatarElement
         * @type {string}
         */
        this.defaultImage = [
            this.pluginPath,
            '/widgets/avatar/images/avatar_placeholder.jpg'
        ].join('');

        /**
         * Define coordinates
         * @memberOf AvatarElement
         * @type {{x: number, y: number}}
         */
        this.coordinates = {};

        return this;
    };

    return AvatarElement.extend(
        'AvatarElement', {

            /**
             * Render Embedded content
             * @memberOf AvatarElement
             * @param {number} x
             * @param {number} y
             */
            renderEmbeddedContent: function renderEmbeddedContent(x, y) {

                /**
                 * Get Element
                 * @type {AvatarElement}
                 */
                var $element = this;

                this.coordinates.x = x;
                this.coordinates.y = y;

                var $avatarMainFrame = [
                    '<div class="bord">',
                    '<div class="imageFrame">',
                    '<img src="', this.defaultImage, '">',
                    '</div>',
                    '<div class="under_layer"><div class="iconsContainer"></div></div>',
                    '</div>'
                ].join('');

                var $draggMenu = [
                    '<div class="dragMenu">',
                    '<span>', this.i18n.t('change.position'), '</span>',
                    '<a class="dragIt">', this.i18n.t('unlock.photo'), '</a>',
                    '</div>'
                ].join('');

                var $avatarIconsData = [
                    {
                        'class': 'changeAvatarButton',
                        'title': this.i18n.t('change.photo')
                    },
                    {
                        'class': 'likeButton',
                        'title': this.i18n.t('like.photo')
                    },
                    {
                        'class': 'settingsButton',
                        'title': this.i18n.t('profile.setting')
                    }
                ];

                $element.view.controller.clearParentThumbnail();

                $element.$.append(
                    $avatarMainFrame
                );

                $('.imageFrame', $element.$).append($draggMenu);

                for (i = 0; i < $avatarIconsData.length; i++) {
                    $('.iconsContainer', $element.$).
                        append([
                            '<a class="', $avatarIconsData[i].class,
                            '" title="', $avatarIconsData[i].title,
                            '">'].join(''));
                }

                this.initFunctionality();
            },

            /**
             * Init functionality
             * @memberOf AvatarElement
             */
            initFunctionality: function initFunctionality() {
                this.defineSelectors();
                this.initAvatarPosition();
                this.bindConfig();
            }
        },
        BaseElement.prototype,
        AvatarBehavior.prototype
    );
});