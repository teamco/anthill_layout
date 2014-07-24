/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/9/13
 * Time: 11:48 AM
 */

define(
    ['modules/Element'],

    /**
     * Define SiteConfigAddPageElement
     * @param {BaseElement} BaseElement
     * @returns {*}
     */
        function defineSiteConfigAddPageElement(BaseElement) {

        /**
         * Define SiteConfig AddPage Element
         * @constructor
         * @class SiteConfigAddPageElement
         * @extends BaseElement
         * @param {SiteConfigView} view
         * @param opts
         * @returns {SiteConfigAddPageElement}
         */
        var SiteConfigAddPageElement = function SiteConfigAddPageElement(view, opts) {

            this._config(view, opts, $('<li />')).build({
                $container: opts.$container,
                destroy: false
            });

            /**
             * Define title
             * @type {string}
             */
            this.title = 'Create new page';

            /**
             * Define description
             * @type {string}
             */
            this.description = 'Clicking a button will take you to the edit page for the new widgets';

            return this.init();
        };

        return SiteConfigAddPageElement.extend('SiteConfigAddPageElement', {

            /**
             * Define Init
             * @member SiteConfigAddPageElement
             * @returns {SiteConfigAddPageElement}
             */
            init: function init() {

                this.setTitle(this.title);
                this.renderTooltip({
                    title: this.title,
                    description: this.description,
                    $container: this
                });

                return this;
            }

        }, BaseElement.prototype);
    }
);