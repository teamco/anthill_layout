/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/24/12
 * Time: 10:12 PM
 * To change this template use File | Settings | File Templates.
 */

define([
    'modules/base',
    'modules/element'
], function defineContent(Base, BaseElement) {

    var Content = function Content(view, opts) {

        return this._config(view, opts, $('<div />')).build({
            $container: opts.$container,
            destroy: true
        });
    };

    return Content.extend({

        demo: function demo() {
            var data = {
                "ID0001": {
                    "id": "ID0001",
                    "type": "story",
                    "content": {
                        "title": "Canada’s North, Home to Bears, and Once, Camels",
                        "lead": "Though camels are usually associated with the searing heat of the desert, a group of scientists reported on Tuesday that they had found fossilized remains of a giant camel, with a shoulder height of perhaps nine feet, in Canada’s frigid high Arctic.",
                        "_comment": "each 'body' line is a paragraph; they need to be joined.",
                        "body": [
                            "\"It’s a surprise when you first hear it,\" said Natalia Rybczynski, a paleontologist at the Canadian Museum of Nature in Ottawa, who discovered the bone fragments in 2006. \"But the Arctic in the winter was like a desert at that time.\"",
                            "Dr. Rybczynski said that though scientists have long believed that camels originated in North America and then spread throughout the world, the remains were found about 750 miles north of what was previously the northernmost known camel fossil, a giant found in Canada’s Yukon Territory in 1913.",
                            "\"It’s just kind of stunning that it’s more than 1,000 kilometers away,\" said Dr. Rybczynski, the lead author of a paper about the camel published Tuesday in the journal Nature Communications.",
                            "She had accompanied a group of scientists to Ellesmere Island, which is in the Nunavut territory, who were studying the climate history of the region. At the time when the oversized camel lived, about 3.5 million years ago, the island was considerably warmer and covered by boreal forest. Still, it had unusually severe winters that lasted about six months, Dr. Rybczynski said.",
                            "Features that enabled the ancient camel to survive those cold winters, like broad feet and its signature hump of fat, proved equally useful as the species went to desert regions, she said.",
                            "\"It’s a really nice example of pre-adaptability,\" Dr. Rybczynski said.",
                            "The camel’s remains, 30 pieces that make up a tibia, were found near an area where a number of fossils of small forest mammals have been previously discovered. Dr. Rybczynski acknowledged, however, that she initially had no idea what she retrieved and was about to study for the next six years.",
                            "\"It was a very buggy year in 2006,\" she said. \"Because there were a lot of mosquitoes I was wearing a bug net over my head and couldn’t tell much of anything.\""
                        ],
                        "byline": "Ian Austen",
                        "source": {
                            "abbreviation": "IHT",
                            "full": "Internation Herald Tribune"
                        },
                        "photos": {
                            "thumbnail": "./images/item-ID0001-story-thumbnail.jpg",
                            "image": "./images/item-ID0001-story-image.jpg"
                        },
                        "location": "Ottawa"
                    },
                    "lifecycle": {
                        "_format": [ "yyyy", "mm", "dd", "hour", "minutes"],
                        "created": [ 2013, 1, 3, 9, 25],
                        "publish": [ 2013, 1, 15, 2, 0],
                        "spotlight": {
                            "start": [ 2013, 1, 17, 4, 0],
                            "end": [ 2013, 1, 22, 11, 59]
                        },
                        "archive": [ 2013, 2, 28, 11, 59],
                        "remove": [ 2013, 6, 30, 11, 59]
                    }
                },

                "ID0002": {
                    "id": "ID0002",
                    "type": "story",
                    "content": {
                        "title": "Ancient crocs swam to North America",
                        "lead": "Relatives of the alligator made it to North America ten million years earlier than mammals, swimming there more than 19 million years ago.",
                        "_comment": "each 'body' line is a paragraph; they need to be joined.",
                        "body": [
                            "The uplift of the Isthmus of Panama 2.6 million years ago is known to have formed a land-bridge that's long been thought to provide the route by which species spread. Armadillos and giant sloths moved up into North America, while relatives of modern horses, rabbits, foxes, pigs, cats, dogs, and elephants moved down into South America.",
                            "However, researchers from the University of Florida and the Smithsonian Tropical Research institute have now discovered the partial skulls of two new species of caiman, relatives of alligators, which live exclusively in South America today - and which shed a surprising new light on the history of interchange and animal distributions between the Americas.",
                            "The fossils were discovered in rocks dated from 19.83 and 19.12 million years old, exposed as the Panama Canal was expanded.",
                            "\"These are the first fossil crocodilian skulls recovered from all of Central America,\" says Alex Hastings of Georgia Southern University. \"They fill a gap in evolution between the alligators of North America and the caimans of South America. It's quite incredible.\"",
                            "The discovery indicates that caimans had dispersed north from South America by the early Miocene - over ten million years earlier than the spread of mammals. It's a bit of a surprise, as caimans can't cope with salt water for very long, supporting a recent hypothesis that Central and South America were much closer to each other 19 million years ago than previously thought.",
                            "\"We are starting to understand that while the mammals in Panama 19-21 million years ago were very similar to those found in Mexico, Texas, and Florida at that time, the reptiles tell a different story,\" says Jonathan Bloch, a vertebrate paleontologist at the Florida Museum of Natural History.",
                            "\"Somehow, they were able to cross over from South America when it was completely isolated by seaways - this is one of the mysteries that will drive future inquiry and research in this region.\""
                        ],
                        "byline": "Kate Taylor",
                        "source": {
                            "abbreviation": "GT Daily",
                            "full": "Internation Herald Tribune"
                        },
                        "photos": {
                            "thumbnail": "./images/item-ID0002-story-thumbnail.jpg",
                            "image": "./images/item-ID0002-story-image.jpg"
                        },
                        "location": "Tampa, Florida"
                    },
                    "lifecycle": {
                        "_format": [ "yyyy", "mm", "dd", "hour", "minutes"],
                        "created": [ 2013, 1, 9, 18, 35],
                        "publish": [ 2013, 1, 15, 2, 0],
                        "spotlight": {
                            "start": [ 2013, 1, 23, 4, 0],
                            "end": [ 2013, 1, 27, 11, 59]
                        },
                        "archive": [ 2013, 2, 28, 11, 59],
                        "remove": [ 2013, 6, 30, 11, 59]
                    }
                },

                "ID0003": {
                    "id": "ID0003",
                    "type": "story",
                    "content": {
                        "title": "Ships could soon travel straight across North Pole",
                        "lead": "Within 50 years, ordinary ships will be able to negotiate shipping lanes through the Arctic Ocean during late summer, new UCLA research shows.",
                        "_comment": "each 'body' line is a paragraph; they need to be joined.",
                        "body": [
                            "\"Based on independent climate forecasts for the years 2040 to 2059, the team's found that in the Arctic ocean's most navigable month, September, icebreakers won't be needed as they are now.\"",
                            "\"We're talking about a future in which open-water vessels will, at least during some years, be able to navigate unescorted through the Arctic, which at the moment is inconceivable,\" says PhD candidate Scott Stephenson.",
                            "Indeed, the Arctic ice sheet is expected to thin so much that polar icebreakers will be able to head from the Pacific to the Atlantic ocean by traveling straight across the North Pole.",
                            "\"Nobody's ever talked about shipping over the top of the North Pole,\" says geography professor Laurence Smith. \"This is an entirely unexpected possibility.\"",
                            "The change could shorten the length of Arctic journeys by a fifth - the North Pole route is 20 percent shorter than today's most-trafficked Arctic shipping lane, the Northern Sea Route, which hugs the coast of Russia. This has already been seeing more traffic, with 46 ships successfully using it last summer.",
                            "And the famous Northwest Passage, which follows Canada's coastline and offers the most direct route from Asia to eastern Canada, could also become far more usable. Currently navigable only one year out of seven, the team believes that by mid-century it'll be navigable every other year.",
                            "Choosing whether to ship through the passage \"will become a coin toss,\" says Smith.",
                            "Opening up these routes, though, could also open up a can of worms. While the US hasn't so far ratified the United Nations Convention on the Law of the Sea, it could now have an incentive to do so. Ratifying the treaty could give the US sovereignty over some of these new shipping lanes, allowing ships to use them without paying the hefty escort fees currently demanded by Russia for similar routes.",
                            "On the other hand, the availability of new shipping routes could also bring the US into conflict with Canada, which has long claimed sovereignty over the Northwest Passage."
                        ],
                        "byline": "Emma Woollacott",
                        "source": {
                            "abbreviation": "CAP",
                            "full": "Canadian Explorer"
                        },
                        "photos": {
                            "thumbnail": "./images/item-ID0003-story-thumbnail.jpg",
                            "image": "./images/item-ID0003-story-image.jpg"
                        },
                        "location": "Iqaluit, Baffin Island"
                    },
                    "lifecycle": {
                        "_format": [ "yyyy", "mm", "dd", "hour", "minutes"],
                        "created": [ 2013, 1, 3, 22, 7],
                        "publish": [ 2013, 1, 15, 2, 0],
                        "spotlight": {
                            "start": [ 2013, 1, 27, 4, 0],
                            "end": [ 2013, 1, 31, 11, 59]
                        },
                        "archive": [ 2013, 2, 28, 11, 59],
                        "remove": [ 2013, 6, 30, 11, 59]
                    }
                },

                "ID0004": {
                    "id": "ID0004",
                    "type": "story",
                    "content": {
                        "title": "Man arrested for harassing baby manatee in Florida",
                        "lead": "A man has been arrested in Florida after posting pictures on Facebook that showed him picking up and harassing a baby manatee.",
                        "_comment": "each 'body' line is a paragraph; they need to be joined.",
                        "body": [
                            "The incriminating images show Ryan William Waterman, 21, and his two children petting a manatee calf at Taylor Creek in Fort Pierce last month, according to the Florida Fish and Wildlife Conservation Commission (FWC). In one shot, Waterman is holding the calf partially out of the shallow water, and in another image, one of his young children is sitting on top of the animal as if riding it.",
                            "While the family's actions might look playful, biologists said such contact could be deadly for a manatee calf.",
                            "\"This was a young manatee, which was likely still dependent on its mother for food and protection. Separating the two could have severe consequences for the calf,\" FWC manatee biologist Thomas Reinert said in a statement.",
                            "Waterman faces charges under the Florida Manatee Sanctuary Act, which makes it illegal to molest, harass or disturb manatees, classified as an endangered species in the state. His offense also violates the Marine Mammal Protection Act of 1972, which makes it illegal to hunt or get up close to manatees as well as all other marine mammals, such as whales, seals and walruses.",
                            "These laws, however, have not prevented some recent close encounters in Florida, perhaps due to a lack of awareness. (Waterman, in fact, told local television station WPEC-TV that he meant no harm and didn't know it was illegal to touch a manatee.)",
                            "There are estimated to be just 3,800 manatees in Florida, and each year, about 87 are killed by humans, according to the U.S. Fish and Wildlife Service, most of them dying in boat collisions. Coastal development, which has altered and destroyed manatee habitat, also threatens the species."
                        ],
                        "byline": "Live Science Staff",
                        "source": {
                            "abbreviation": "NBC",
                            "full": "Science on NBC News"
                        },
                        "photos": {
                            "thumbnail": "./images/item-ID0004-story-thumbnail.jpg",
                            "image": "./images/item-ID0004-story-image.jpg"
                        },
                        "location": "Fort Pierce, Florida"
                    },
                    "lifecycle": {
                        "_format": [ "yyyy", "mm", "dd", "hour", "minutes"],
                        "created": [ 2013, 1, 12, 12, 55],
                        "publish": [ 2013, 1, 16, 2, 0],
                        "spotlight": {
                            "start": [ 2013, 1, 16, 9, 0],
                            "end": [ 2013, 1, 16, 11, 59]
                        },
                        "archive": [ 2013, 1, 28, 11, 59],
                        "remove": [ 2013, 6, 30, 11, 59]
                    }
                }
            };

            var minW = 100,
                maxW = 200,
                i = 0;

            var count = Math.round(this.getWidth() / maxW),
                color = this.invertColor('backgroundColor');
            if (this.getWidth() > maxW * count) {
                this.$.html('<ul></ul>');
                $.each(data, function (index, v) {
                    if (i < count) {
                        i += 1;
                        this.$.find('ul').append(
                            $([
                                '<li><h2>', v.content.title, '</h2>',
                                '<p>', v.content.body.join('<br /><br />'), '</p>',
                                '</li>'
                            ].join(''))
                        );
                    } else {
                        return false;
                    }
                }.bind(this));
            }

        }

    }, Base, BaseElement.prototype);
});