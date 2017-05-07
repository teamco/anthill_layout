/**
 * Created by Tkachv on 3/19/2017.
 */
/*jslint node: true */
'use strict';

var createFolderGlobs = function(fileTypePatterns) {
  fileTypePatterns =
      Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
  var ignore = ['node', 'node_modules'];
  var fs = require('fs');
  return fs.readdirSync(process.cwd()).map(function(file) {
    if (ignore.indexOf(file) !== -1 || !file.indexOf('.') ||
        !fs.lstatSync(file).isDirectory()) {
      return null;
    } else {
      return fileTypePatterns.map(function(pattern) {
        return file + '/**/' + pattern;
      });
    }
  }).filter(function(patterns) {
    return patterns;
  }).concat(fileTypePatterns);
};

module.exports = function(grunt) {

  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  var rewriteRulesSnippet = require(
      'grunt-connect-rewrite/lib/utils').rewriteRequest;

  // Project configuration.

  grunt.initConfig({
    connect: {
      options: {
        port: 3000,
        hostname: 'localhost',
        logger: 'dev'
      },
      rules: [
        {from: '^/assets/scripts/(.*)$', to: '/javascripts/scripts/$1'},
        {from: '^/assets/public/(.*)$', to: '/javascripts/public/$1'},
        {from: '^/assets/services/(.*)$', to: '/javascripts/services/$1'},
        {from: '^/assets/stylesheets/(.*)$', to: '/stylesheets/$1'},
        {
          from: '^/fonts/(glyphicons-halflings-regular.*)$',
          to: '/javascripts/scripts/core/lib/packages/bootstrap/fonts/$1'
        },
        {
          from: '^/fonts/(fontawesome-webfont.*)$',
          to: '/javascripts/scripts/core/lib/packages/font-awesome/fonts/$1'
        }
      ],
      local: {
        options: {
          middleware: function(connect, options) {
            // inject a custom middleware into the array of default middlewares.
            var middlewares = [];

            // RewriteRules support
            middlewares.push(rewriteRulesSnippet);

            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            var directory = options.directory ||
                options.base[options.base.length - 1];
            options.base.forEach(function(base) {
              // Serve static files.
              middlewares.push(serveStatic(base));
            });

            // Make directory browse-able.
            middlewares.push(serveIndex(directory));

            middlewares.unshift(function(req, res, next) {
              if (req.url === '/author/site_storages/shared/widgets.json') {
                res.end(JSON.stringify({
                      'categories': [
                        {
                          'id': 74,
                          'name_index': 'xxx',
                          'name_value': 'Adult',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/74'
                        }, {
                          'id': 69,
                          'name_index': 'image',
                          'name_value': 'Image gallery',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/69'
                        }, {
                          'id': 72,
                          'name_index': 'tv',
                          'name_value': 'Live TV',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/72'
                        }, {
                          'id': 67,
                          'name_index': 'map',
                          'name_value': 'Map widgets',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/67'
                        }, {
                          'id': 64,
                          'name_index': 'regular',
                          'name_value': 'Regular widgets',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/64'
                        }, {
                          'id': 68,
                          'name_index': 'files',
                          'name_value': 'Show file',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/68'
                        }, {
                          'id': 70,
                          'name_index': 'social',
                          'name_value': 'Social network',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/70'
                        }, {
                          'id': 71,
                          'name_index': 'template',
                          'name_value': 'Template content',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/71'
                        }, {
                          'id': 65,
                          'name_index': 'text',
                          'name_value': 'Text editor',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/65'
                        }, {
                          'id': 66,
                          'name_index': 'video',
                          'name_value': 'Video player',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/66'
                        }, {
                          'id': 73,
                          'name_index': 'weather',
                          'name_value': 'Weather',
                          'url': 'http://anthill.herokuapp.com/author/widget_categories/73'
                        }
                      ],
                      'widgets': [
                        {
                          'id': 1211,
                          'uuid': '4a14f390-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '1+1',
                          'description': 'Офіційне представництво каналу 1+1 в інтернеті',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'one.plus.one',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1211'
                        }, {
                          'id': 1254,
                          'uuid': '4a752dc0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '11 канал',
                          'description': 'Телекомпания 11 канал, Днепропетровск, Украина',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'eleven.channel.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1254'
                        }, {
                          'id': 1213,
                          'uuid': '4a1920c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '23 Photo Sharing',
                          'description': '23 is easy photo sharing. Share private or public with photo albums, tags, storage, slideshow, photoblog, subscriptions, send photos and much more.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'twenty.three',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1213'
                        }, {
                          'id': 1231,
                          'uuid': '4a404f00-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '24Video.net',
                          'description': 'Порно сайт 24 video net - это сотни новых порно видео о сексе в копилку каждый день',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'twenty.four.video',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1231'
                        }, {
                          'id': 1193,
                          'uuid': '49ef0780-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '5 канал',
                          'description': 'Перший український інформаційний',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'five.channel.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1193'
                        }, {
                          'id': 1248,
                          'uuid': '4a686a00-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '9 Канал',
                          'description': 'Телекомпания «Приват ТВ Днепр». Днепропетровский региональный канал',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'channel.nine.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1248'
                        }, {
                          'id': 1345,
                          'uuid': '4b2a78f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'AccuWeather Videos',
                          'description': 'Every day over a billion people worldwide rely on AccuWeather to help them plan their lives, protect their businesses, and get more from their day',
                          'dimensions': {'width': 250, 'height': 150},
                          'type': 'weather',
                          'resource': 'accuweather.videos',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1345'
                        }, {
                          'id': 1349,
                          'uuid': '4b335520-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'AccuWeather Widget',
                          'description': 'Add current weather conditions to your website - help site visitors stay warm, dry, and safe with current temperature, precipitation, and severe weather alerts',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'weather',
                          'resource': 'accuweather.widget',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1349'
                        }, {
                          'id': 1158,
                          'uuid': '49a69860-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Adobe Flash player',
                          'description': 'Adobe Flash Player is the standard for delivering high-impact, rich Web content. Designs, animation, and application user interfaces are deployed immediately across all browsers and platforms, attracting and engaging users with a rich Web experience.',
                          'dimensions': {'width': 15, 'height': 15},
                          'type': 'video',
                          'resource': 'swf',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1158'
                        }, {
                          'id': 1284,
                          'uuid': '4abac350-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Aliez.tv',
                          'description': 'Live streaming',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'aliez.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1284'
                        }, {
                          'id': 1301,
                          'uuid': '4ada81e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Animatron',
                          'description': 'Use the intuitive Animatron Editor to design and publish animated and interactive content that plays everywhere, from desktop computers to mobile devices.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'animatron',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1301'
                        }, {
                          'id': 1194,
                          'uuid': '49f164f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Animoto',
                          'description': 'Animoto is a cloud-based video creation service that produces video from photos, video clips, and music into video slideshows',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'animoto',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1194'
                        }, {
                          'id': 1249,
                          'uuid': '4a6b44b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'A-ONE Hip-Hop Music',
                          'description': 'ФэШн музыкальный мейнстрим',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'a.one.hip.hop',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1249'
                        }, {
                          'id': 1291,
                          'uuid': '4ac77a40-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'ArcGIS',
                          'description': 'Discover the capabilities of ArcGIS through powerful location services, data management, analysis, and mapping.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'map',
                          'resource': 'arcgis',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1291'
                        }, {
                          'id': 1140,
                          'uuid': '49729e80-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Avatar',
                          'description': 'Pick a photo and put it as your Avatar',
                          'dimensions': {'width': 60, 'height': 70},
                          'type': 'image',
                          'resource': 'avatar',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1140'
                        }, {
                          'id': 1261,
                          'uuid': '4a8383d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Bigmir)net',
                          'description': 'Смотреть тысячи видео приколов онлайн бесплатно, музыкальные клипы, трейлеры, мультфильмы, новости и просто интересные ютуб видео ролики онлайн',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'bigmir.net',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1261'
                        }, {
                          'id': 1286,
                          'uuid': '4abeab20-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Bing Maps',
                          'description': 'View an interactive map and get turn by turn driving directions. Find traffic details, road conditions, street maps, Multimap, satellite photos, and aerial maps.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'map',
                          'resource': 'bing.maps',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1286'
                        }, {
                          'id': 1199,
                          'uuid': '49fab810-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Blip',
                          'description': 'Blip is a media platform for web series content and also offers a dashboard for producers of original web series to distribute and monetize their productions',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'blip.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1199'
                        }, {
                          'id': 1302,
                          'uuid': '4adc7120-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Cacoo',
                          'description': 'Cacoo - Your ideas. Our canvas.\nhttps://cacoo.com/\nUser-friendly and versatile. A free online diagram tool for creating sitemaps, flowcharts, mind maps, wireframes, mockups, UML models, and etc.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'files',
                          'resource': 'cacoo',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1302'
                        }, {
                          'id': 1307,
                          'uuid': '4ae66d70-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Circuit Lab',
                          'description': 'Effortless schematics. Powerful simulation. Choosing the right design tools makes your job easier.\n- Design with our easy-to-use schematic editor.\n- Accurate analog \u0026 digital circuit simulations in seconds.\n- Professional schematic PDFs, wiring diagrams, and plots.\n- No installation required - try it instantly.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'text',
                          'resource': 'circuit.lab',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1307'
                        }, {
                          'id': 1276,
                          'uuid': '4aab7c20-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'ClockLink',
                          'description': 'ClockLink.com provides the most widely used free web clock in the world with over 30 million views around the world. In addition, clocks can be set to display any time zone in the world, so they are not only decorative but very practical as well. You can use a free ClockLink clock to show what time it is in your area. There is no charge to use any of the clocks on your website or blog, they are completely free! ',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'clocklink',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1276'
                        }, {
                          'id': 1305,
                          'uuid': '4ae25740-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Clyp it',
                          'description': 'Introducing the easiest way to share audio. Record or upload your favorite sounds and we give you a short link to share with your friends.',
                          'dimensions': {'width': 150, 'height': 50},
                          'type': 'video',
                          'resource': 'clyp.it',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1305'
                        }, {
                          'id': 1292,
                          'uuid': '4ac907f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'CodePen.io',
                          'description': 'Show off your latest creation and get feedback. Build a test case for that pesky bug. Find example design patterns and inspiration for your projects.',
                          'dimensions': {'width': 150, 'height': 50},
                          'type': 'text',
                          'resource': 'codepen.io',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1292'
                        }, {
                          'id': 1306,
                          'uuid': '4ae44b30-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Codepoints',
                          'description': 'The content on this website reflects the information found in The Unicode Consortium. The Unicode Standard, Version 8.0.0, (Mountain View, CA: The Unicode Consortium, 2012. ISBN 978-1-936213-02-3) http://www.unicode.org/versions/Unicode8.0.0/,\nwhich happens to be the most relevant version of the Unicode Standard as of August, 2012.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'codepoints',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1306'
                        }, {
                          'id': 1195,
                          'uuid': '49f34450-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'CollegeHumor',
                          'description': 'CollegeHumor - Funny Videos, Funny Pictures, Funny Links!\nHumor intended for college aged students.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'social',
                          'resource': 'college.humor',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1195'
                        }, {
                          'id': 1171,
                          'uuid': '49c33a40-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Coub',
                          'description': 'A coub is a looped video up to 10 seconds long. Turn your favorite videos into coubs online. Share them with friends and enjoy what others create.',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'social',
                          'resource': 'coub',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1171'
                        }, {
                          'id': 1186,
                          'uuid': '49e0aa60-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Dailymotion',
                          'description': 'Dailymotion - Watch, publish, share videos.\nThe latest music videos, short movies, tv shows, funny and extreme videos',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'daily.motion',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1186'
                        }, {
                          'id': 1273,
                          'uuid': '4aa69f10-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Datepicker',
                          'description': 'Choose a date, click elsewhere on the page (blur the input), or hit the Esc key to close',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'datepicker',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1273'
                        }, {
                          'id': 1215,
                          'uuid': '4a1d29c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'deviantART',
                          'description': 'deviantART: where ART meets application!\nArt - community of artists and those devoted to art. Digital art, skin art, themes, wallpaper art, traditional art, photography, poetry / prose. Art prints.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'deviant.art',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1215'
                        }, {
                          'id': 1309,
                          'uuid': '4ae9ba40-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Dipity',
                          'description': 'Dipity is a free digital timeline website. Our mission is to organize the web\'s content by date and time. Users can create, share, embed and collaborate on interactive, visually engaging timelines that integrate video, audio, images, text, links, social media, location and timestamps.',
                          'dimensions': {'width': 250, 'height': 150},
                          'type': 'social',
                          'resource': 'dipity',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1309'
                        }, {
                          'id': 1304,
                          'uuid': '4ae06120-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Docs.com',
                          'description': 'Publish unlimited PowerPoint, Word, Excel, Office Mix, and PDF documents, as well as Sways, for free – always with rich formatting intact.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'files',
                          'resource': 'docs.com',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1304'
                        }, {
                          'id': 1303,
                          'uuid': '4ade15c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Dotsub',
                          'description': 'Join these enterprises who trust Dotsub to language enable their videos because of our price-performance and these exclusive features.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'dotsub',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1303'
                        }, {
                          'id': 1137,
                          'uuid': '496a8e70-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Dropbox',
                          'description': 'Dropbox is a free service that lets you bring your photos, docs, and videos anywhere and share them easily.',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'files',
                          'resource': 'dropbox',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1137'
                        }, {
                          'id': 1351,
                          'uuid': '4b37cc90-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'eBaums World',
                          'description': 'eBaum\'s World is a website based in Rochester, New York featuring entertainment media such as videos, Adobe Flash cartoons, and web games.',
                          'dimensions': {'width': 250, 'height': 150},
                          'type': 'video',
                          'resource': 'ebaums.world',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1351'
                        }, {
                          'id': 1308,
                          'uuid': '4ae834f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'edocr',
                          'description': 'The document marketplace. Edocr allows you to publish and share your content, embed a document viewer on your website, improve your content’s search engine optimization, generate leads with gated content and earn money by selling your documents.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'files',
                          'resource': 'edocr',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1308'
                        }, {
                          'id': 1311,
                          'uuid': '4aed5740-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Embed Articles',
                          'description': 'eA or simply known as EmbedArticles.com is a website that aims to create a whole new approach to sharing content via embedable cards and widgets.\nWe are trying to create a standard or a common ground in sharing full-text content without sacrificing its value and ownership. EmbedArticles.com does not compete with other article directories and present content sites. It simply enhances these websites by providing a FREE and quality service through a feature called "Embed Articles" or reposting article summaries.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'embed.articles',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1311'
                        }, {
                          'id': 1274,
                          'uuid': '4aa82a30-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Embedly',
                          'description': 'Embedly delivers the ultra-fast, easy to use products and tools for richer sites and apps',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'embedly',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1274'
                        }, {
                          'id': 1244,
                          'uuid': '4a60d950-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Empflix',
                          'description': 'EmpFlix free porn tube largest porn hub of free porn xxx movies for you to jizz over on Empflix sex tube',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'empflix',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1244'
                        }, {
                          'id': 1136,
                          'uuid': '49682de0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Empty',
                          'description': 'Empty widget',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'regular',
                          'resource': 'empty',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1136'
                        }, {
                          'id': 1272,
                          'uuid': '4aa4d070-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Events Calendar',
                          'description': 'FullCalendar is great for displaying events, but it isn\'t a complete solution for event content-management. Beyond dragging an event to a different time/day, you cannot change an event\'s name or other associated data. It is up to you to add this functionality through FullCalendar\'s event hooks',
                          'dimensions': {'width': 500, 'height': 500},
                          'type': 'regular',
                          'resource': 'events.calendar',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1272'
                        }, {
                          'id': 1166,
                          'uuid': '49b8c500-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Events Diary',
                          'description': 'Events reminder tool',
                          'dimensions': {'width': 90, 'height': 120},
                          'type': 'social',
                          'resource': 'events',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1166'
                        }, {
                          'id': 1275,
                          'uuid': '4aa9cb90-cbb8-0134-996a-665e526e96f3',
                          'is_external': true,
                          'external_resource': 'https://dl.dropboxusercontent.com/u/9268245/external/',
                          'name': 'External widget',
                          'description': 'A simple external',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'external.widget',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1275'
                        }, {
                          'id': 1242,
                          'uuid': '4a5d1930-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Extremetube',
                          'description': 'Enjoy porno movies for free on Extremetube.com. Extreme anal and bondage sex videos available to stream or download.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'extreme.tube',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1242'
                        }, {
                          'id': 1295,
                          'uuid': '4acfce00-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Facebook Embedded Posts',
                          'description': 'Embedded Posts are a simple way to put public posts - by a Page or a person on Facebook - into the content of your web site or web page. Only public posts from Facebook Pages and profiles can be embedded.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'social',
                          'resource': 'facebook.embedded.posts',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1295'
                        }, {
                          'id': 1237,
                          'uuid': '4a4d9760-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Fapa.TV',
                          'description': 'Самые потрясные эротические видео ролики интернета, бесплатно и без регистрации',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'fapa.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1237'
                        }, {
                          'id': 1343,
                          'uuid': '4b25b300-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'FastPic',
                          'description': 'Хостинг картинок, изображений. Быстрый и бесплатный сервис размещения изображений, скриншотов и постеров на форумах.',
                          'dimensions': {'width': 250, 'height': 200},
                          'type': 'image',
                          'resource': 'fastpic',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1343'
                        }, {
                          'id': 1167,
                          'uuid': '49bac4c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'FilmOn',
                          'description': 'LiveTV HDi. Anytime. Anywhere',
                          'dimensions': {'width': 90, 'height': 120},
                          'type': 'video',
                          'resource': 'film.on',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1167'
                        }, {
                          'id': 1293,
                          'uuid': '4acaba50-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Film.ru',
                          'description': 'Национальный кинопортал Фильм.ру — ведущее российское специализированное Интернет-издание о кино, выходит с декабря 1999 года.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'film.ru',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1293'
                        }, {
                          'id': 1173,
                          'uuid': '49c753d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Flickr',
                          'description': 'Become obsessed with our social feed of daily inspiration from the photographers you follow. Explore Flickr to easily find everything you\'re interested in',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'social',
                          'resource': 'flickr',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1173'
                        }, {
                          'id': 1270,
                          'uuid': '4aa11780-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Flickr Feeds',
                          'description': 'Flickr provides a number of data feeds in a variety of formats',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'flickr.feeds',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1270'
                        }, {
                          'id': 1265,
                          'uuid': '4a962310-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Flip PDF',
                          'description': 'Convert PDFs into Interactive Animated Publications\nhttp://www.mightydeals.com/deal/flip-pdf.html',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'files',
                          'resource': 'flip.pdf',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1265'
                        }, {
                          'id': 1348,
                          'uuid': '4b31bd70-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Forecast.io',
                          'description': 'Full-featured, global weather service, complete with 7-day forecasts that cover world, beautiful weather visualizations, and a time machine for exploring the weather in the past and far future',
                          'dimensions': {'width': 250, 'height': 100},
                          'type': 'weather',
                          'resource': 'forecast.io',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1348'
                        }, {
                          'id': 1221,
                          'uuid': '4a2a2a50-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'FotoKritik',
                          'description': 'FotoKritik\'te kaliteli fotoğrafları izleyebilir, amatör ve profesyonel tüm fotoğraflarınızı paylaşabilir, fotoğraf galerinizi sergileyebilir ve fotoğrafçılara ulaşabilirsiniz',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'foto.kritik',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1221'
                        }, {
                          'id': 1250,
                          'uuid': '4a6d1ed0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'FreshTV',
                          'description': 'Телеканал Freshtv.tv круглосуточно транслирует музыкальные клипы отечественных и зарубежных звезд шоу-бизнеса в сети интернет',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'fresh.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1250'
                        }, {
                          'id': 1143,
                          'uuid': '498297b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Friends Online',
                          'description': 'Shows all your friends which are currently online',
                          'dimensions': {'width': 12, 'height': 11},
                          'type': 'social',
                          'resource': 'online.friends',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1143'
                        }, {
                          'id': 1184,
                          'uuid': '49dd0fb0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Funny or Die',
                          'description': 'Funny or Die makes really funny videos that feature your favorite comedians and celebrities',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'social',
                          'resource': 'funny.or.die',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1184'
                        }, {
                          'id': 1154,
                          'uuid': '499eabe0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Geolocation Map',
                          'description': 'Geolocation is the identification of the real-world geographic location of an object, such as a radar, mobile phone or an Internet-connected computer terminal',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'map',
                          'resource': 'geolocation.map',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1154'
                        }, {
                          'id': 1310,
                          'uuid': '4aeba8a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Getty Images',
                          'description': 'Find high resolution royalty-free images, editorial stock photos, vector art, video footage clips and stock music licensing at the richest image search photo library online.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'image',
                          'resource': 'getty.images',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1310'
                        }, {
                          'id': 1315,
                          'uuid': '4af3db30-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Gfycat',
                          'description': 'Gfycat lets you create, discover and share awesome GIFs, amazing moments and funny reactions',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'gfycat',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1315'
                        }, {
                          'id': 1220,
                          'uuid': '4a286ff0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Giphy',
                          'description': 'Search Animated GIFs on the Web',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'giphy',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1220'
                        }, {
                          'id': 1168,
                          'uuid': '49bd2980-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Google+',
                          'description': 'One Google Account for everything Google',
                          'dimensions': {'width': 90, 'height': 120},
                          'type': 'social',
                          'resource': 'google.plus',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1168'
                        }, {
                          'id': 1172,
                          'uuid': '49c5c540-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Google Presentation',
                          'description': 'Create a new presentation and edit with others at the same time',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'files',
                          'resource': 'google.presentation',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1172'
                        }, {
                          'id': 1160,
                          'uuid': '49abfa20-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Header',
                          'description': 'Header widget',
                          'dimensions': {'width': 33, 'height': 2},
                          'type': 'template',
                          'resource': 'header',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1160'
                        }, {
                          'id': 1283,
                          'uuid': '4ab84de0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'HERE. Maps for Life',
                          'description': 'Maps have always been at the heart of our mission. Only the maps we are creating today are very different from those we grew up with.\nPowered by our leading location cloud and enriched with dynamic data, maps from HERE are becoming increasingly real time – capturing the changing world like never before. ',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'map',
                          'resource': 'here.maps.for.life',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1283'
                        }, {
                          'id': 1224,
                          'uuid': '4a302fd0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Howcast',
                          'description': 'Howcast is a website that provides instructional short-form how-to video and text content that combines practical information with various filmmaking techniques such as humor, claymation and animation',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'howcast',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1224'
                        }, {
                          'id': 1312,
                          'uuid': '4aeef340-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Huffduffer',
                          'description': 'Create your own podcast.\n- Find links to audio files on the Web.\n- Huffduff the links—add them to your podcast.\n- Subscribe to podcasts of other found sounds.',
                          'dimensions': {'width': 150, 'height': 50},
                          'type': 'video',
                          'resource': 'huffduffer',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1312'
                        }, {
                          'id': 1161,
                          'uuid': '49ae44c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Ice Floe',
                          'description': 'White base container for several widgets',
                          'dimensions': {'width': 80, 'height': 200},
                          'type': 'template',
                          'resource': 'ice.floe',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1161'
                        }, {
                          'id': 1164,
                          'uuid': '49b51430-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'ICTV',
                          'description': 'ICTV – перший в Україні недержавний загальнонаціональний канал',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'ictv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1164'
                        }, {
                          'id': 1313,
                          'uuid': '4af07c70-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'iFixit',
                          'description': 'iFixit: The Free Repair Manual\nhttps://www.ifixit.com/\niFixit is a global community of people helping each other repair things. Let\'s fix the world, one device at a time.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'files',
                          'resource': 'ifixit',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1313'
                        }, {
                          'id': 1336,
                          'uuid': '4b16ddc0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Iframely',
                          'description': 'Iframely gives you embed codes which we prepare with great care to make your site safe, fast and beautiful.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'regular',
                          'resource': 'iframely',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1336'
                        }, {
                          'id': 1314,
                          'uuid': '4af23e50-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'IFTTT',
                          'description': 'IFTTT is a free web-based service that allows users to create chains of simple conditional statements, called "recipes", which are triggered based on changes to other web services such as Gmail, Facebook, Instagram, and Pinterest. IFTTT is an abbreviation of "If This Then That".',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'social',
                          'resource': 'ifttt',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1314'
                        }, {
                          'id': 1149,
                          'uuid': '49940830-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Image',
                          'description': 'A simple image widget that uses the native media manager to add image widgets to your site',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'image',
                          'resource': 'image',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1149'
                        }, {
                          'id': 1150,
                          'uuid': '49967bc0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Image Gallery',
                          'description': 'Image gallery provides an image viewer',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'image',
                          'resource': 'image.gallery',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1150'
                        }, {
                          'id': 1316,
                          'uuid': '4af59290-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Infogr.am',
                          'description': 'Create online charts \u0026 infographics',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'text',
                          'resource': 'infogr.am',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1316'
                        }, {
                          'id': 1174,
                          'uuid': '49c90fa0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Instagram',
                          'description': 'Capture and Share the World\'s Moments. Instagram is a fast, beautiful and fun way to share your life with friends and family',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'social',
                          'resource': 'instagram',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1174'
                        }, {
                          'id': 1287,
                          'uuid': '4ac06370-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Interlude',
                          'description': 'Interlude videos are interactive, engaging and completely seamless, offering a multi-layered video experience for the digital age.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'interlude',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1287'
                        }, {
                          'id': 1212,
                          'uuid': '4a171350-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Isnare',
                          'description': 'Free articles and press release submission and distribution site offering quality ezine articles reprint services',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'isnare',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1212'
                        }, {
                          'id': 1198,
                          'uuid': '49f90060-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Issuu',
                          'description': 'Issuu is a digital publishing platform that makes it simple to publish magazines, catalogs, newspapers, books, and more online.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'issuu',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1198'
                        }, {
                          'id': 1210,
                          'uuid': '4a12be40-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'JSFiddle',
                          'description': 'JSFiddle: Create a new fiddle.\nTest and share JavaScript, CSS, HTML or CoffeeScript online',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'js.fiddle',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1210'
                        }, {
                          'id': 1145,
                          'uuid': '4988db80-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'JW Player',
                          'description': 'JW Player powers online publishing, with clients ranging in size from Fortune 500 companies to individual bloggers',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'video',
                          'resource': 'jwplayer',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1145'
                        }, {
                          'id': 1285,
                          'uuid': '4abc9d30-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Kaltura',
                          'description': 'Kaltura is a New York-based software company founded in 2006. Kaltura states that their products allow publishers and content owners to publish, manage, monetize and analyze their video and other rich-media content.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'kaltura',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1285'
                        }, {
                          'id': 1241,
                          'uuid': '4a5ab540-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Keezmovies',
                          'description': 'See the hottest porn stars having sex at the best porntube Keezmovies.com',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'keez.movies',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1241'
                        }, {
                          'id': 1227,
                          'uuid': '4a3778b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Kickstarter',
                          'description': 'Kickstarter is the world\'s largest funding platform for creative projects',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'kick.starter',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1227'
                        }, {
                          'id': 1317,
                          'uuid': '4af700a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Kitchenbowl',
                          'description': 'Kitchenbowl: Step-By-Step Photo Recipes\nwww.kitchenbowl.com/\nKitchenbowl is a place to showcase your kitchen creations and inspire one another. It\'s a collaborative photo cookbook, authored by people you trust.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'files',
                          'resource': 'kitchenbowl',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1317'
                        }, {
                          'id': 1256,
                          'uuid': '4a78e210-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Krem',
                          'description': 'KREM.com is the official website for KREM-TV, Channel 2, your trusted source for breaking news, weather and sports in Spokane, Washington',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'krem',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1256'
                        }, {
                          'id': 1189,
                          'uuid': '49e72220-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Laim.tv',
                          'description': 'Мы на волне хайпа!',
                          'dimensions': {'width': 250, 'height': 200},
                          'type': 'video',
                          'resource': 'laim.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1189'
                        }, {
                          'id': 1318,
                          'uuid': '4af8bdd0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Learning Apps',
                          'description': 'Learning Apps is a free, web-based authoring software and platform to support learning and teaching processes with small interactive, multimedia learning modules',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'files',
                          'resource': 'learning.apps',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1318'
                        }, {
                          'id': 1268,
                          'uuid': '4a9cd920-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Lifestream',
                          'description': 'Show a stream of your online activity',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'social',
                          'resource': 'lifestream',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1268'
                        }, {
                          'id': 1299,
                          'uuid': '4ad74390-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Live amCharts',
                          'description': 'amCharts is an advanced charting library that will suit any data visualization need. Our charting solution include Column, Bar, Line, Area, Step, Step without risers, Smoothed line, Candlestick, OHLC, Pie/Donut, Radar/ Polar, XY/Scatter/Bubble, Bullet, Funnel/Pyramid charts as well as Gauges.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'regular',
                          'resource': 'live.amcharts',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1299'
                        }, {
                          'id': 1183,
                          'uuid': '49db0cf0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'LiveLeak',
                          'description': 'LiveLeak.com - Redefining the Media',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'live.leak',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1183'
                        }, {
                          'id': 1188,
                          'uuid': '49e56670-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Livestream',
                          'description': 'Livestream is the Leader in Live Video. Find out how Livestream can help you broadcast your event live to viewers on any device.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'livestream',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1188'
                        }, {
                          'id': 1156,
                          'uuid': '49a2b7e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Login',
                          'description': 'Login to your page',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'social',
                          'resource': 'login',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1156'
                        }, {
                          'id': 1162,
                          'uuid': '49b097c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Login Facebook',
                          'description': 'Login with your Facebook account',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'social',
                          'resource': 'login.facebook',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1162'
                        }, {
                          'id': 1163,
                          'uuid': '49b29df0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Login Google',
                          'description': 'Login with your Google account',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'social',
                          'resource': 'login.google',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1163'
                        }, {
                          'id': 1138,
                          'uuid': '496d0710-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Map Locator',
                          'description': 'Map locator',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'map',
                          'resource': 'map.locator',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1138'
                        }, {
                          'id': 1288,
                          'uuid': '4ac213b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Map Quest',
                          'description': 'Official MapQuest website, find driving directions, maps, live traffic updates and road conditions. Find nearby businesses, restaurants and hotels. Explore!',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'map',
                          'resource': 'map.quest',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1288'
                        }, {
                          'id': 1290,
                          'uuid': '4ac5c0f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Metamorphic',
                          'description': 'Metamorphic widget that possesses the ability to assume content consistent with that of its observer\'s strongest type.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'regular',
                          'resource': 'metamorphic',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1290'
                        }, {
                          'id': 1182,
                          'uuid': '49d955e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Meta.ua',
                          'description': 'Украинская мета-поисковая система, портал, новости и информация о стране',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'meta.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1182'
                        }, {
                          'id': 1228,
                          'uuid': '4a3a7450-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Mixbook',
                          'description': 'Easily Create Photo Books, Scrapbooks, Photo Cards, Yearbooks and Calendars in minutes with our simple online scrapbooking software',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'mixbook',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1228'
                        }, {
                          'id': 1196,
                          'uuid': '49f59c90-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Mixcloud',
                          'description': 'Listen to the best DJs and radio presenters in the world for free',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'mixcloud',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1196'
                        }, {
                          'id': 1219,
                          'uuid': '4a26ae20-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'mlkshk',
                          'description': 'Easily save images from everywhere on the web',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'mlkshk',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1219'
                        }, {
                          'id': 1200,
                          'uuid': '49fc7180-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Mobypicture',
                          'description': 'Directly share your photos, videos and audio with your friends on your favorite social sites: facebook, twitter, flickr, youtube, and more!',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'mobypicture',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1200'
                        }, {
                          'id': 1144,
                          'uuid': '49850170-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Multiple Icons',
                          'description': 'Widget with multiple usable tools and features',
                          'dimensions': {'width': 3, 'height': 30},
                          'type': 'template',
                          'resource': 'multiple.icons',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1144'
                        }, {
                          'id': 1319,
                          'uuid': '4afa98f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'National Film Board of Canada',
                          'description': 'The NFB is a public agency that produces and distributes films and other audiovisual works which reflect Canada to Canadians and the rest of the world.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'national.film.board.of.canada',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1319'
                        }, {
                          'id': 1339,
                          'uuid': '4b1c5b60-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Odnoklassniki',
                          'description': 'Odnoklassniki, OK.ru is a social network service for classmates and old friends. It is popular in Russia and former Soviet Republics.',
                          'dimensions': {'width': 100, 'height': 150},
                          'type': 'social',
                          'resource': 'odnoklassniki',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1339'
                        }, {
                          'id': 1320,
                          'uuid': '4afc6e80-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Office Mix',
                          'description': 'A free add-in for PowerPoint. Everything you need to easily create and share interactive online videos. Voice, Video \u0026 Digital Ink.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'files',
                          'resource': 'office.mix',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1320'
                        }, {
                          'id': 1155,
                          'uuid': '49a0c520-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Open Weather Map',
                          'description': 'The OpenWeatherMap service provides free weather data and forecast API suitable for any cartographic services like web and smartphones applications',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'map',
                          'resource': 'open.weather.map',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1155'
                        }, {
                          'id': 1321,
                          'uuid': '4afe22b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Ora.TV',
                          'description': 'Ora.TV: Watch Free Television Online\nwww.ora.tv/\nOra.TV is a onDemand video network that offers free television shows streaming online. Watch tv free online today!',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'ora.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1321'
                        }, {
                          'id': 1282,
                          'uuid': '4ab6b330-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Orphus',
                          'description': 'The main idea of Orphus is simple: use integrated intellect of all your site readers (i.e. native intellect) to eliminate text mistakes and typos. We may say that Orphus "quantizes" the native intellect.\nImagine that a user reads any text and suddenly stumbles on a typo (sometimes we say "his eye gets stuck"). What does this user feel? Something annoying. Many users even begin to click an errorous word with mouse mechanically and immediately remove the selection - they try to get rid of an annoying feeling! And here the Orphus begins its act: user may just select a typo with mouse and press Ctrl+Enter; after that an information immediately (in the background!) is sent to a webmaster of your site, i.e. to you.',
                          'dimensions': {'width': 10, 'height': 10},
                          'type': 'text',
                          'resource': 'orphus',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1282'
                        }, {
                          'id': 1322,
                          'uuid': '4affa9c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Oumy',
                          'description': 'Oumy: Learn how to present\nhttps://www.oumy.com/\nThe easy way for students to practice their speaking and presentation skills.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'oumy',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1322'
                        }, {
                          'id': 1294,
                          'uuid': '4acc7ec0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Ovva.tv',
                          'description': 'Сериалы, фильмы, шоу, новости, спортивные события и другой видео-контент. Всё, что ты пропустишь по ТВ, будет ждать тебя на OVVA.TV',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'ovva.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1294'
                        }, {
                          'id': 1135,
                          'uuid': '495699d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Page Tabs',
                          'description': 'Show page tabs',
                          'dimensions': {'width': 30, 'height': 5},
                          'type': 'template',
                          'resource': 'page.tabs',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1135'
                        }, {
                          'id': 1229,
                          'uuid': '4a3c8280-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Pastebin',
                          'description': 'Pastebin.com is the number one paste tool since 2002. Pastebin is a website where you can store text online for a set period of time.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'pastebin',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1229'
                        }, {
                          'id': 1323,
                          'uuid': '4b00fb30-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Pastery',
                          'description': 'Pastery is the sweetest pastebin in the world. A pastebin is a website that lets you send large bodies of text to other people.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'text',
                          'resource': 'pastery',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1323'
                        }, {
                          'id': 1296,
                          'uuid': '4ad17d70-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'PayPal Button',
                          'description': 'Integrating with the experimental PayPal JavaScript buttons is as easy as including a small snippet of code',
                          'dimensions': {'width': 80, 'height': 50},
                          'type': 'social',
                          'resource': 'paypal.btn',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1296'
                        }, {
                          'id': 1153,
                          'uuid': '499c7ff0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Pdf',
                          'description': 'Portable Document Format (PDF) is a file format used to present documents in a manner independent of application software, hardware, and operating systems',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'files',
                          'resource': 'pdf',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1153'
                        }, {
                          'id': 1141,
                          'uuid': '497a47d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Pet Passport',
                          'description': 'Shows all information about your pet',
                          'dimensions': {'width': 12, 'height': 13},
                          'type': 'social',
                          'resource': 'pet.passport',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1141'
                        }, {
                          'id': 1139,
                          'uuid': '496f94e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Pet Radar',
                          'description': 'Shows online pets arround you',
                          'dimensions': {'width': 30, 'height': 30},
                          'type': 'map',
                          'resource': 'pet.radar',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1139'
                        }, {
                          'id': 1197,
                          'uuid': '49f745a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Photobucket',
                          'description': 'Photobucket is an image hosting and video hosting website, web services suite, and online community dedicated to preserving and sharing the entire photo and video lifecycle.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'photobucket',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1197'
                        }, {
                          'id': 1216,
                          'uuid': '4a203a30-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Picasa Web Albums',
                          'description': 'Fast and easy photo sharing from Google. Share with friends and family, or explore public photos.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'picasa',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1216'
                        }, {
                          'id': 1175,
                          'uuid': '49cb33b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Pinterest',
                          'description': 'Pinterest is a visual discovery tool that you can use to find ideas for all your projects and interests',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'social',
                          'resource': 'pinterest',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1175'
                        }, {
                          'id': 1263,
                          'uuid': '4a88d1e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Pixiv',
                          'description': 'Pixiv is a Japanese online community for artists',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'social',
                          'resource': 'pixiv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1263'
                        }, {
                          'id': 1350,
                          'uuid': '4b35f310-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'piZap Photo Editor',
                          'description': 'piZap Photo Editor is fun and easy to learn online photo editor \u0026 collage maker. Tons of effects, fonts, stickers, collage layouts, borders, frames, and editing tools.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'image',
                          'resource': 'pizap.photo.editor',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1350'
                        }, {
                          'id': 1337,
                          'uuid': '4b188240-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Playwire',
                          'description': 'Publish and distribute your high-quality video to thousands of websites for multi-screen viewing. Playwire’s new Bolt Video Player is fully customizable and mobile responsive.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'playwire',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1337'
                        }, {
                          'id': 1202,
                          'uuid': '4a011f40-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Polldaddy',
                          'description': 'Create stunning surveys, polls, and quizzes in minutes. Collect responses via your website, e-mail, iPad, Facebook, and Twitter.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'regular',
                          'resource': 'polldaddy',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1202'
                        }, {
                          'id': 1243,
                          'uuid': '4a5f1b30-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'PornHost',
                          'description': 'Free file hosting with a twist',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'porn.host',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1243'
                        }, {
                          'id': 1178,
                          'uuid': '49d14470-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'PornHub',
                          'description': 'The World\'s Biggest XXX Porno Tube',
                          'dimensions': {'width': 40, 'height': 40},
                          'type': 'xxx',
                          'resource': 'pornhub',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1178'
                        }, {
                          'id': 1324,
                          'uuid': '4b031260-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Portfolium',
                          'description': 'Portfolium - Your digital portfolio to land amazing jobs\nhttps://portfolium.com/\nDon\'t tell people your dreams, show them what you\'re doing to reach them. Portfolium is a collaborative network of people showcasing their projects.',
                          'dimensions': {'width': 100, 'height': 150},
                          'type': 'social',
                          'resource': 'portfolium',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1324'
                        }, {
                          'id': 1165,
                          'uuid': '49b6f990-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Post Template',
                          'description': 'Visual layout of posted note on the wall',
                          'dimensions': {'width': 34, 'height': 10},
                          'type': 'template',
                          'resource': 'post.template',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1165'
                        }, {
                          'id': 1142,
                          'uuid': '497d53b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Post Tool',
                          'description': 'Post news, images, videos etc. on your wall',
                          'dimensions': {'width': 35, 'height': 5},
                          'type': 'social',
                          'resource': 'post.tool',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1142'
                        }, {
                          'id': 1266,
                          'uuid': '4a98afe0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Prezi',
                          'description': 'Prezi is cloud-based, meaning you can present from your browser, desktop, iPad, iPhone, or Android device and always have the latest version of your work at your fingertips. Create or edit on the go, then auto-sync across all your devices with ease.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'files',
                          'resource': 'prezi',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1266'
                        }, {
                          'id': 1342,
                          'uuid': '4b22ba80-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'ProChan',
                          'description': 'ProChan is a powerful, open-minded social networking site that enables you to create your own social media platform (my-channel.prochan.com), without worrying about any technical details or hosting.',
                          'dimensions': {'width': 250, 'height': 150},
                          'type': 'social',
                          'resource': 'prochan',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1342'
                        }, {
                          'id': 1180,
                          'uuid': '49d4c400-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'QR Code',
                          'description': 'A barcode is a machine-readable optical label that contains information about the item to which it is attached',
                          'dimensions': {'width': 40, 'height': 40},
                          'type': 'text',
                          'resource': 'qr.code',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1180'
                        }, {
                          'id': 1147,
                          'uuid': '498ef1f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Quicktime',
                          'description': 'A powerful multimedia technology with a built-in media player, QuickTime lets you view internet video, HD movie trailers, and personal media in a wide range of file formats',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'video',
                          'resource': 'quicktime',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1147'
                        }, {
                          'id': 1203,
                          'uuid': '4a033730-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Rdio',
                          'description': 'Rdio is an online music service that offers ad-supported free streaming service and ad-free subscription services in 60 countries',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'rdio',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1203'
                        }, {
                          'id': 1179,
                          'uuid': '49d2feb0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'RedTube',
                          'description': 'Welcome to RedTube, the Home of Videos Porno. Our site is dedicated to all you porno lovers out there.',
                          'dimensions': {'width': 40, 'height': 40},
                          'type': 'xxx',
                          'resource': 'red.tube',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1179'
                        }, {
                          'id': 1332,
                          'uuid': '4b0f3ad0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'ReleaseWire',
                          'description': 'ReleaseWire - From Release To Results\nwww.releasewire.com\nReach journalists and bloggers with powerful press release distribution, multimedia distribution and media contact management. Analyze your results and respond to the changing media engagement process.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'regular',
                          'resource': 'releasewire',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1332'
                        }, {
                          'id': 1344,
                          'uuid': '4b28a770-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Ren.tv',
                          'description': 'REN TV (Russian: РЕН ТВ) is one of the largest private federal TV channels in Russia',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'ren.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1344'
                        }, {
                          'id': 1331,
                          'uuid': '4b0dc5b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'RepubHub',
                          'description': 'Where editors, bloggers and marketers get licensed, republishable content.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'regular',
                          'resource': 'repubhub',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1331'
                        }, {
                          'id': 1329,
                          'uuid': '4b0aa3e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'ReverbNation',
                          'description': 'Since 2006, ReverbNation has helped millions of emerging Artists build their careers. We’ve connected Artists to venues, festivals, brands, publishers, labels, and the fans themselves. ReverbNation’s mission puts Artists First.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'video',
                          'resource': 'reverbnation',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1329'
                        }, {
                          'id': 1204,
                          'uuid': '4a057f70-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Revision3',
                          'description': 'Revision3, a Discovery Digital network, is a place for fans who love tech, games and all-things-internet',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'revision',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1204'
                        }, {
                          'id': 1151,
                          'uuid': '49983600-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'RSS',
                          'description': 'Subscribing to a website RSS removes the need for the user to manually check the web site for new content',
                          'dimensions': {'width': 100, 'height': 50},
                          'type': 'social',
                          'resource': 'rss',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1151'
                        }, {
                          'id': 1159,
                          'uuid': '49a96650-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Rutube',
                          'description': 'Rutube is a web video streaming service targeted at Russian speakers',
                          'dimensions': {'width': 15, 'height': 15},
                          'type': 'video',
                          'resource': 'rutube',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1159'
                        }, {
                          'id': 1289,
                          'uuid': '4ac40680-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'SAP OpenUI',
                          'description': 'Build enterprise-ready web applications, responsive to all devices and running on the browser of your choice. That’s OpenUI5.',
                          'dimensions': {'width': 150, 'height': 50},
                          'type': 'regular',
                          'resource': 'sap.openui',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1289'
                        }, {
                          'id': 1330,
                          'uuid': '4b0c2a00-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'SAPO Videos',
                          'description': 'Partilhe os seus vídeos com Portugal e o Mundo',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'sapo.videos',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1330'
                        }, {
                          'id': 1334,
                          'uuid': '4b12f4b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Scoff',
                          'description': 'We hope you’re hungry, because here you\'ll find inspirational recipe videos featuring quick tips and familiar foodie faces',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'scoff',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1334'
                        }, {
                          'id': 1226,
                          'uuid': '4a351240-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Screencast',
                          'description': 'Free online storage and sharing with Screencast.com',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'screencast',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1226'
                        }, {
                          'id': 1223,
                          'uuid': '4a2e71d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Screenr',
                          'description': 'Instant screencasts: Just click record.\nScreenr\'s web-based screen recorder makes it a breeze to create and share your screencasts around the web.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'screenr',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1223'
                        }, {
                          'id': 1205,
                          'uuid': '4a082920-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Scribd',
                          'description': 'Scribd - Read Unlimited Books.\nA digital documents library that allows users to publish, discover and discuss original writings and documents in various languages.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'scribd',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1205'
                        }, {
                          'id': 1157,
                          'uuid': '49a4b250-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Share',
                          'description': 'Share your page with your friends',
                          'dimensions': {'width': 100, 'height': 30},
                          'type': 'social',
                          'resource': 'share',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1157'
                        }, {
                          'id': 1328,
                          'uuid': '4b091150-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Shoudio',
                          'description': 'Shoudio - The Location Based Audio Platform\nhttps://shoudio.com/\nHear recent Shoudio\'s here. Shoudios are location based audio recordings.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'map',
                          'resource': 'shoudio',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1328'
                        }, {
                          'id': 1333,
                          'uuid': '4b114e00-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Show the Way',
                          'description': 'Show the Way, actionable location info\nhttps://showtheway.io/\nShow the Way is the best free way to share, embed, print actionable location info anywhere. Supports popular apps like Waze, Maps, Uber, and more.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'map',
                          'resource': 'show.the.way',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1333'
                        }, {
                          'id': 1264,
                          'uuid': '4a903930-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Simple Weather',
                          'description': 'A simple jQuery plugin to display current weather data for any location and doesn\'t get in your way',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'map',
                          'resource': 'simple.weather',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1264'
                        }, {
                          'id': 1341,
                          'uuid': '4b20ad20-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Sinoptik',
                          'description': 'Подробный прогноз погоды для Вашего города от SINOPTIK',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'map',
                          'resource': 'sinoptik',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1341'
                        }, {
                          'id': 1326,
                          'uuid': '4b05fbe0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Sketchfab',
                          'description': 'Sketchfab - The place to be for 3D\nhttps://sketchfab.com/\nUse Sketchfab to publish, share and embed interactive 3D files. Discover and download thousands of 3D models from games, cultural heritage, architecture, ...',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'video',
                          'resource': 'sketchfab',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1326'
                        }, {
                          'id': 1338,
                          'uuid': '4b1a7770-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Skype',
                          'description': 'The Skype for Business Web App plugin, available for browsers such IE, Safari, and Firefox, provides audio/video media capability and desktop sharing.',
                          'dimensions': {'width': 150, 'height': 250},
                          'type': 'social',
                          'resource': 'skype',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1338'
                        }, {
                          'id': 1170,
                          'uuid': '49c0fee0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'SlideShare',
                          'description': 'Share what you know and love through presentations, infographics, documents and more',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'social',
                          'resource': 'slide.share',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1170'
                        }, {
                          'id': 1260,
                          'uuid': '4a810dd0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Smotri.com',
                          'description': 'Smotri.com — бесплатный сервис для размещения, хранения и просмотра видеофайлов',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'smotri.com',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1260'
                        }, {
                          'id': 1218,
                          'uuid': '4a24c350-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Someecards',
                          'description': 'Send free funny ecards, like birthday e-cards, thank you online cards, and funny wedding invitations',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'some.ecards',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1218'
                        }, {
                          'id': 1206,
                          'uuid': '4a0a5f00-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'SoundCloud',
                          'description': 'SoundCloud is an online audio distribution platform based in Berlin, Germany that enables its users to upload, record, promote and share their originally-created sounds',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'sound.cloud',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1206'
                        }, {
                          'id': 1240,
                          'uuid': '4a58c0a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Spankwire',
                          'description': 'Spankwire delivers sexy free porn videos',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'spankwire',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1240'
                        }, {
                          'id': 1300,
                          'uuid': '4ad8d250-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Speaker Deck',
                          'description': 'Share Presentations without the Mess. Speaker Deck is the best way to share presentations online. Simply upload your slides as a PDF, and we’ll turn them into a beautiful online experience. View them on SpeakerDeck.com, or share them on any website with an embed code.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'text',
                          'resource': 'speaker.deck',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1300'
                        }, {
                          'id': 1353,
                          'uuid': '4b3c1040-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Sportbox.ru',
                          'description': 'Новости спорта, Спортивная аналитика, Видео',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'sportbox.ru',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1353'
                        }, {
                          'id': 1297,
                          'uuid': '4ad36790-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'SportLive',
                          'description': 'Sportlive.ws это бесплатный сайт, Прямые спортивные видео трансляции, спортивные игры онлайн!',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'sportlive',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1297'
                        }, {
                          'id': 1236,
                          'uuid': '4a4b23b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Stepashka',
                          'description': 'Смотреть Фильмы онлайн',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'stepashka',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1236'
                        }, {
                          'id': 1225,
                          'uuid': '4a32c900-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'SublimeVideo',
                          'description': 'The best-looking player comes with a hosted service only. There is, however, a free and unlimited plan available, which should be enough for most users.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'sublime.video',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1225'
                        }, {
                          'id': 1327,
                          'uuid': '4b0781c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Sway',
                          'description': 'Create and share interactive reports, presentations, personal stories, and more.',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'regular',
                          'resource': 'sway',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1327'
                        }, {
                          'id': 1277,
                          'uuid': '4aad8890-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Syntax Highlighter',
                          'description': 'SyntaxHighlighter is a fully functional self-contained code syntax highlighter developed in JavaScript',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'text',
                          'resource': 'syntax.highlighter',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1277'
                        }, {
                          'id': 1207,
                          'uuid': '4a0c6aa0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'TED',
                          'description': 'TED is a global set of conferences owned by the private non-profit Sapling Foundation, under the slogan: "Ideas Worth Spreading"',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'ted',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1207'
                        }, {
                          'id': 1346,
                          'uuid': '4b2ca3a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'The Weather Network',
                          'description': 'Find the most current, accurate and reliable weather forecasts and conditions with The Weather Network',
                          'dimensions': {'width': 100, 'height': 50},
                          'type': 'weather',
                          'resource': 'the.weather.network',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1346'
                        }, {
                          'id': 1230,
                          'uuid': '4a3e8fd0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Timetoast',
                          'description': 'Make timelines, share them on the web. Timetoast is a great way to share the past, or even the future... Create timelines in minutes, it\'s as simple as can be.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'social',
                          'resource': 'time.toast',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1230'
                        }, {
                          'id': 1280,
                          'uuid': '4ab390a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'TinyMCE',
                          'description': 'TinyMCE is a platform independent web-based JavaScript HTML WYSIWYG\neditor control released as open source under LGPL.\nTinyMCE enables you to convert HTML textarea fields or other HTML elements to editor instances.',
                          'dimensions': {'width': 250, 'height': 150},
                          'type': 'text',
                          'resource': 'tinymce',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1280'
                        }, {
                          'id': 1214,
                          'uuid': '4a1b4a50-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'TinyPic',
                          'description': 'TinyPic - Free Image Hosting, Photo Sharing \u0026 Video Hosting.\nTinyPic is a photo and video sharing service, owned and operated by Photobucket.com, that allows users to upload, link and share, images and videos on the Internet',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'tiny.pic',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1214'
                        }, {
                          'id': 1245,
                          'uuid': '4a628c00-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'TNAFlix',
                          'description': 'TNAFlix is the ultimate xxx porn, sex and hardcore tube, free pussy movies',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'tna.flix',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1245'
                        }, {
                          'id': 1181,
                          'uuid': '49d72800-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Truba',
                          'description': 'Компания «Ситилинк» — мультисервисный оператор связи, специализирующийся на оказании Интернет-услуг частным и корпоративным клиентам на территории республики Карелия',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'truba',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1181'
                        }, {
                          'id': 1239,
                          'uuid': '4a52b6e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Tube8',
                          'description': 'Streaming the best free porn videos on Tube 8',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'tube.eight',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1239'
                        }, {
                          'id': 1352,
                          'uuid': '4b3a2ca0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'TUT.BY',
                          'description': 'Последние новости Беларуси и зарубежья. Быстрый поиск. Надежная бесплатная электронная почта. Погода, курсы валют, афиша мероприятий, карта вашего горда – все, что нужно современному белорусу.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'tut.by',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1352'
                        }, {
                          'id': 1217,
                          'uuid': '4a229f60-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'TwitrPix',
                          'description': 'TwitrPix is a social media discovery and sharing platform - easily upload and share photos to Twitter using webcam, mobile phone, computer or email',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'twitr.pix',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1217'
                        }, {
                          'id': 1152,
                          'uuid': '499a5b70-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Twits',
                          'description': 'Show unique twitter thread',
                          'dimensions': {'width': 100, 'height': 50},
                          'type': 'social',
                          'resource': 'twits',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1152'
                        }, {
                          'id': 1234,
                          'uuid': '4a46cba0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'UBR',
                          'description': 'The Business News TV channel covers economic events in the Ukraine and in the world, interviews with top officials of Ukrainian business and rapid information on market trends like exchange rates from the Bank, the dynamics of oil prices, gold and many other information',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'ubr',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1234'
                        }, {
                          'id': 1279,
                          'uuid': '4ab122e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'URL Widget',
                          'description': 'Simple widget that displays an content from an URL on your page',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'regular',
                          'resource': 'url.widget',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1279'
                        }, {
                          'id': 1232,
                          'uuid': '4a4290d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Ustream',
                          'description': 'Ustream — The leading HD streaming video platform.\nPut the power of Pro Broadcasting to work for your brand — deliver ad-free, HD streaming video to all devices, worldwide',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'ustream',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1232'
                        }, {
                          'id': 1325,
                          'uuid': '4b049680-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Verse',
                          'description': 'Build better stories on a video platform that gives viewers more and surrenders less.\nCreate an immersive, interactive multimedia experience with Verse today.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'verse',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1325'
                        }, {
                          'id': 1281,
                          'uuid': '4ab52f50-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Videochart.net',
                          'description': 'Videochart.net is the best video hosting site of all the websites operating in the open spaces of internet',
                          'dimensions': {'width': 150, 'height': 150},
                          'type': 'video',
                          'resource': 'videochart.net',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1281'
                        }, {
                          'id': 1271,
                          'uuid': '4aa2f800-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'VideoPay',
                          'description': 'VideoPay.net – национальный видео-сервис, позволяющий Пользователям зарабатывать на видео-роликах',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'video.pay.net',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1271'
                        }, {
                          'id': 1298,
                          'uuid': '4ad53fb0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'VideoPress',
                          'description': 'Powerful, simple video hosting for WordPress. VideoPress was designed specifically for WordPress. Uploading videos to your blog couldn’t be easier.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'videopress',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1298'
                        }, {
                          'id': 1222,
                          'uuid': '4a2c0fe0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Vidme',
                          'description': 'Instant video uploads. Simple video sharing. No account required.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'vidme',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1222'
                        }, {
                          'id': 1148,
                          'uuid': '499129f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Vimeo',
                          'description': 'Vimeo is video + you. We put your videos first and give you the best ways to share, discover, and be inspired',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'video',
                          'resource': 'vimeo',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1148'
                        }, {
                          'id': 1169,
                          'uuid': '49befd40-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Vine',
                          'description': 'Explore a world of beautiful, looping videos',
                          'dimensions': {'width': 12, 'height': 12},
                          'type': 'video',
                          'resource': 'vine.co',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1169'
                        }, {
                          'id': 1347,
                          'uuid': '4b2f5db0-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Weather Underground',
                          'description': 'Weather Underground provides local \u0026 long range Weather Forecast, weather reports, maps \u0026 tropical weather conditions for locations worldwide',
                          'dimensions': {'width': 100, 'height': 70},
                          'type': 'weather',
                          'resource': 'weather.underground',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1347'
                        }, {
                          'id': 1278,
                          'uuid': '4aaf4d50-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'WebRTC Video Chat',
                          'description': 'WebRTC, so hot right now. If you haven’t heard of it, WebRTC (Web Realtime Communications) is an API that enables peer-to-peer video, audio, and data communication in a web browser with no plugins, frameworks, or applications required',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'social',
                          'resource': 'webrtc.video.chat',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1278'
                        }, {
                          'id': 1340,
                          'uuid': '4b1e5550-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Wikimapia',
                          'description': 'Wikimapia - Let\'s describe the whole world!\nWikimapia is an online editable map - you can describe any place on Earth. Or just surf the map discovering tonns of already marked places.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'map',
                          'resource': 'wikimapia',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1340'
                        }, {
                          'id': 1335,
                          'uuid': '4b150000-cbb8-0134-996a-665e526e96f3',
                          'is_external': false,
                          'external_resource': null,
                          'name': 'Wistia',
                          'description': 'Wistia combines world-class video hosting, marketing tools, and video analytics.',
                          'dimensions': {'width': 150, 'height': 100},
                          'type': 'video',
                          'resource': 'wistia',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1335'
                        }, {
                          'id': 1208,
                          'uuid': '4a0e93d0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'WordCampTV',
                          'description': 'Presentations, Highlights, and Behind-the-Scenes looks from WordCamps around the World',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'wordcamp.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1208'
                        }, {
                          'id': 1176,
                          'uuid': '49cce9f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'xHamster',
                          'description': 'xHamster is virtual pet that need thousands of megabytes with fresh porn to eat daily and millions people come to eat with us',
                          'dimensions': {'width': 40, 'height': 40},
                          'type': 'xxx',
                          'resource': 'x.hamster',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1176'
                        }, {
                          'id': 1201,
                          'uuid': '49fef9f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'XKCD',
                          'description': 'xkcd, sometimes stylized as XKCD, is a webcomic created by Randall Munroe. The comic\'s tagline describes it as a "A webcomic of romance, sarcasm, math, and language" (formerly a "Stick-figure strip featuring humour about technology, science, mathematics and relationships"). Munroe states on the comic\'s website that the name of the comic is not an acronym but "just a word with no phonetic pronunciation".',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'xkcd',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1201'
                        }, {
                          'id': 1177,
                          'uuid': '49cefac0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'xVideos',
                          'description': 'XVideos.com is a free hosting service for porn videos',
                          'dimensions': {'width': 40, 'height': 40},
                          'type': 'xxx',
                          'resource': 'x.videos',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1177'
                        }, {
                          'id': 1238,
                          'uuid': '4a4fb220-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'YouPorn',
                          'description': 'YOUPORN is your home for XXX \u0026 Free PORN videos. WATCH the best TEEN sex on the net! Enjoy the sexiest PORN with the hottest naked girls in our videos.',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'xxx',
                          'resource': 'you.porn',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1238'
                        }, {
                          'id': 1146,
                          'uuid': '498cc370-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Youtube',
                          'description': 'YouTube provides a forum for people to connect, inform, and inspire others across the globe and acts as a distribution platform for original content creators and advertisers large and small',
                          'dimensions': {'width': 100, 'height': 100},
                          'type': 'video',
                          'resource': 'youtube',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1146'
                        }, {
                          'id': 1246,
                          'uuid': '4a64ad40-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'ערוץ 10',
                          'description': 'נענע10 - חדשות, ערוצי תוכן, משחקים, ישרא-בלוג ותוכניות ערוץ10',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'channel.ten.il',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1246'
                        }, {
                          'id': 1247,
                          'uuid': '4a6689e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'ערוץ 2',
                          'description': 'ערוץ 2',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'channel.two.il',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1247'
                        }, {
                          'id': 1192,
                          'uuid': '49ecfb50-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Громадське Телебачення',
                          'description': 'Hromadske.tv is a civil initiative, a joint project of Ukrainian journalists to create a social media media task',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'hromadske.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1192'
                        }, {
                          'id': 1191,
                          'uuid': '49eb0610-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Еспресо TV',
                          'description': 'Еспресо TV – Завжди новини!',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'espreso.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1191'
                        }, {
                          'id': 1257,
                          'uuid': '4a7ada20-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Мой мир mail.ru',
                          'description': 'Find friends and share photos, play games, watch great videos, listen to the best music',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'my.world',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1257'
                        }, {
                          'id': 1235,
                          'uuid': '4a48e440-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'МУЗ-ТВ',
                          'description': 'В эфире - модная музыка и клипы, чарты и новости шоу-бизнеса',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'mus.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1235'
                        }, {
                          'id': 1262,
                          'uuid': '4a867030-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Первый канал',
                          'description': 'Первый канал представляет на своем сайте новости, передачи, видео, on-line вещание, интерактивное общение',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'onetv.ru',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1262'
                        }, {
                          'id': 1187,
                          'uuid': '49e25da0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': '#ПИКTB',
                          'description': 'Телеканал #ПИКТВ - Первый Интернет Канал информационно - развлекательный портал pik-tv.com',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'pik.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1187'
                        }, {
                          'id': 1253,
                          'uuid': '4a734810-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Премьера.тв',
                          'description': 'Телеканал Премьера.тв знакомит с документальным и авторским кино, работами молодых и талантливых режиссеров, студентов киновузов',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'premiere.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1253'
                        }, {
                          'id': 1258,
                          'uuid': '4a7cfd10-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Радикал-Фото',
                          'description': 'Cервис позволяет легко и быстро публиковать ваши картинки на страницах любого интернет-форума, блога, чата, доске объявлений',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'radikal.foto',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1258'
                        }, {
                          'id': 1269,
                          'uuid': '4a9e7d40-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Спорт-Экспресс',
                          'description': 'Ежедневная спортивная газета',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'sport.express',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1269'
                        }, {
                          'id': 1252,
                          'uuid': '4a70f7c0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'ТВТур',
                          'description': 'Уникальные фильмы о путешествиях по странам и континентам',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'tour.tv',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1252'
                        }, {
                          'id': 1255,
                          'uuid': '4a770a90-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Телеканал 112',
                          'description': 'Аналитика геополитических процессов в Украине и за рубежом',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'one.twelve.channel.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1255'
                        }, {
                          'id': 1251,
                          'uuid': '4a6efbe0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Телеканал 1HD',
                          'description': 'Телеканал 1HD - музыкально-развлекательный канал премиум -класса',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'one.hd.ru',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1251'
                        }, {
                          'id': 1185,
                          'uuid': '49ded310-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Телеканал новин 24',
                          'description': 'Загальноукраїнський цілодобовий канал новин',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'telekanal.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1185'
                        }, {
                          'id': 1190,
                          'uuid': '49e8f370-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Телеканал новин 24 Live',
                          'description': 'Загальноукраїнський цілодобовий канал новин',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'twenty.four.live',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1190'
                        }, {
                          'id': 1233,
                          'uuid': '4a44e4b0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Телеканал ТВі',
                          'description': 'TVI or TBI is a independent TV channel. It is known for its critical coverage of the Ukrainian government',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'tv',
                          'resource': 'tvi',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1233'
                        }, {
                          'id': 1209,
                          'uuid': '4a10c6a0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'ТСН',
                          'description': 'ТСН Новини України',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'tsn.ua',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1209'
                        }, {
                          'id': 1259,
                          'uuid': '4a7f18e0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'Фотохостинг FirePic',
                          'description': 'FirePic – бесплатный фотохостинг без регистрации для публикации фотографий, картинок и других изображений на форумах, в чатах, блогах и других сайтах сети Интернет',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'image',
                          'resource': 'fire.pic',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1259'
                        }, {
                          'id': 1267,
                          'uuid': '4a9af8f0-cbb8-0134-996a-665e526e96f3',
                          'is_external': null,
                          'external_resource': null,
                          'name': 'ЯП файлы',
                          'description': 'Удобный и бесплатный сервис для хранения и публикации медиа-файлов',
                          'dimensions': {'width': 50, 'height': 50},
                          'type': 'video',
                          'resource': 'yap.files',
                          'url': 'http://anthill.herokuapp.com/author/widgets/1267'
                        }
                      ]
                    })
                );
              }
              return next();
            });

            return middlewares;
          }
        },
        proxies: [
          // {
          //   context: '*',
          //   host: 'localhost',
          //   port: 3000
          // }
        ]
      }
    },
    watch: {
      main: {
        options: {
          livereload: true,
          livereloadOnError: false,
          spawn: false
        },
        files: [createFolderGlobs(['javascripts/**.js', 'stylesheets/**.css'])],
        tasks: [] //all the tasks are run dynamically during the watch event handler
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'stylesheets/output.css': [
            'javascripts/scripts/core/lib/packages/font-awesome/font-awesome.min.css',
            'javascripts/scripts/core/lib/packages/bootstrap/css/animate.css',
            'javascripts/scripts/core/lib/packages/bootstrap/css/bootstrap-theme.min.css',
            'javascripts/scripts/core/lib/packages/bootstrap/css/bootstrap.min.css',
            'javascripts/scripts/core/stylesheets/general.css',
            'javascripts/scripts/core/stylesheets/cover.css',
            'javascripts/scripts/core/stylesheets/jquery-ui.min.css',
            'javascripts/scripts/core/stylesheets/modal.css',
            'javascripts/scripts/core/stylesheets/page.css',
            'javascripts/scripts/core/stylesheets/renderer.css',
            'javascripts/scripts/core/stylesheets/reset.css',
            'javascripts/scripts/core/stylesheets/tooltip.css',
            'javascripts/scripts/core/stylesheets/widget.css',
            'javascripts/scripts/core/stylesheets/workspace.css',
            'javascripts/scripts/plugins/stylesheets/combined.css'
          ]
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'stylesheets/shared.css': 'stylesheets/shared.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'stylesheets/shared.css': 'stylesheets/shared.scss'
        }
      }
    },
    open: {
      dev: {
        path: 'http://localhost:3000/index.html',
        app: 'chrome'
      }
    },
    exec: {
      rails: {
        command: 'rails server'
      },
      python: {
        command: 'python -m SimpleHTTPServer 3000'
      }
    }
  });

  grunt.registerTask('default', ['cssmin', 'sass:dist', 'open:dev', 'watch']);
  grunt.registerTask('rails', ['exec:rails', 'default']);
  grunt.registerTask('python', ['exec:python', 'default']);
  grunt.registerTask('server',
      ['configureRewriteRules', 'connect:local', 'default']);

  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-connect-route');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-connect-rewrite');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
};