/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/4/12
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'config/anthill',
    'modules/model'
], function defineGalleryModel(AntHill, BaseModel) {

    /**
     * Define Gallery model
     * @extends AntHill
     * @extends BaseModel
     * @class GalleryModel
     * @constructor
     */
    var GalleryModel = function GalleryModel() {

        /**
         * Define default providers
         * @member GalleryModel
         */
        this.defaultProviders = [];

        /**
         * Define static data
         * @member GalleryModel
         * @type {*[]}
         */
        this.staticData = [
            {
                name: 'Empty',
                description: 'Empty widget',
                thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE1klEQVR4Xu1ay07rVhS1j4MhgFRVqtRRO+EDQGJa2glCICSG3H5JJ5132Fn7Ex0yQapuRwxB6CImlao7QaLilYS87MSvrhV5RyduGxvk64TYR1raO9sxOWvtfR4c24yiyChzU0AlQJlRCVAJUAlQCVAJUGbU9MDx8fFnT09P7zzP+y6+NgQ80zSHURTRT2KglBrQ4rrL7wFuEASMO7C85tJnvFarObZtu/f39875+bk3DwKMd4JHR0ffNJvN947j2IV2wDRpotiPAPpiQ0BsiBgtEcAXG4DDyCJO+GIJxL34mkeEYfih0+n8dHV11ZwQ4ODg4PeHh4ddowQNgjTB+0tWoZKg7/tbRkkayH8O7NBX8di3IcAXRrmaPZ4EUfpKv7K7u2tsbW2NfIwZXTndik/Id1le8jlp5TvJmNyn308k/5Ygeb98lvuTvzHhn52dGTc3N4lVIIGdnR1jc3NTCOikiLS4IId4/r99cXGReR8gM7RkI2tckEM859+WCkwKUCIRyCNVAJIgFk0E4kVb4UUTgfdnHgIklKcI9GctglRB5iGQpwiMz1oEWUYzD4GFFUFvtQxjXwiJr8eJXOJayxwXsvpGLAgC2mnDOlUAndTcikCivu8TQppI+x/gRRUwdyLQDgYDYzgcjoi/omWeBHUiM50TmFUSbrfbBs4rjH6//0ry2TdCQnKmInieZ+Dgwmi1Wka32yXpQs8ESaJwEZhtx3GYaWacmRexc0b6EChUBGb7+fl5RLzX68lklifS9wFFVwJnbpJtNBokX0S2yeFFO8HcRZBZnOOaxDmhUYhZNjVFrTxE4OTFSYykefLEsc2SnxXfbEMA5/acjJgtZojk0kSQJYvkeC8J8+8w0yx1lvj8PxgR3N3dkcCkUkoZlmUZeLhBn2SJsUC089rSt8LpEMJFlm/xq0BJHoqUWoCqApJQJct+JUA1CVaTYDUJllKASoBqFahWgWoV+M9nB7V5L1meLxA8mxDLswVageu6OngeQcsTJ7HipzwYybfD0lHG2BGJyWGLWL3D9AkeovAaRfhU4v6tC8AXCkMZEre3t8b19bWusN5hUZOf6U90+C00y7L+wDuCHyZelNzb2/sLx1cbb24dVyoCfMCLX9UdAA5ifVzuwaftwtLvwv/T9/33SNwlRAjHQ2B5efnnpaWlX1CuRc/IzEgIPyCJ+P1jF9Zh50kk7niPFgnrINaB30GM5MKXigae2zAfgeZYgJOTk1/39/e/xVngOyiUtfO0AhLwYUliCN8h0OEerKjPTHQQayPWgv8Uk4gKXgojGPWvSfD09PT7w8PD31AeP0CErxDySCJWvxOTaAMtxBsg8ojsPcLOy+BndlW9XieslZUVC5U9hm3bFuYr//Ly8hEcAl0AeWPcDoLgI05+fwSxTFUA8p8qSxyWanV11dLIKI0MoUDY0oHEmNO2Anj85jKBugBC3sT4/xoCKI4NksursVNra2t6ZpQQEiIACQghhSSwH/9HJiBeWSEuuFEAP1kBdZR9QPLTyEB1c319nZkZgWRIRBBnZQwSQTWpKSSKmnWl/0OYhl4Bsk2MoMyI/MbGhrW9vV2PyZgxERNQWomFMd5UQ5L8mGeg7wN0iDArxmK2EOinbYUDwDEWuKUJEAFBdSJUgvYPTFvpcZflZF0AAAAASUVORK5CYII=',
                dimensions: {
                    width: 4,
                    height: 2
                },
                resource: 'empty'
            },
            {
                name: 'Youtube',
                description: 'YouTube provides a forum for people to connect, inform, and inspire others across the globe and acts as a distribution platform for original content creators and advertisers large and small',
                thumbnail: 'data:image/png;base64,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',
                dimensions: {
                    width: 2,
                    height: 2
                },
                src: '',
                resource: 'youtube'
            }
        ];

        /**
         * Define providers
         * @member GalleryModel
         * @type {{indoor: {name: string, data: *[]}}}
         */
        this.providers = {
            all: {
                name: 'All',
                data: []
            },
            indoor: {
                name: 'Indoor',
                data: this.staticData
            }
        };

        /**
         * Define default provider
         * @member GalleryModel
         * @type {{name: string, data: *[]}[]}
         */
        this.defaultProvider = this.getProvidersList().indoor;
    };

    return GalleryModel.extend('GalleryModel', {

        /**
         * Get data provider
         * @member GalleryModel
         * @param provider
         * @returns {*}
         */
        getDataProvider: function getDataProvider(provider) {
            return provider.data;
        },

        /**
         * Get providers list
         * @member GalleryModel
         * @returns {*}
         */
        getProvidersList: function getProvidersList() {
            return this.providers;
        },

        /**
         * Set provider
         * @member GalleryModel
         * @param provider
         */
        setProvider: function setProvider(provider) {

            /**
             * Merge provider data
             */
            this.providers = $.extend(true, this.providers, provider);
        }

    }, AntHill.prototype, BaseModel.prototype);
});