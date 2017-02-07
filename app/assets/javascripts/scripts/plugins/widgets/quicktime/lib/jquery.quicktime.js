/**
 * Quicktime (http://jquery.lukelutman.com/plugins/quicktime)
 * A jQuery plugin for embedding Quicktime movies.
 *
 * Version 1.0
 * November 9th, 2006
 *
 * Copyright (c) 2006 Luke Lutman (http://www.lukelutman.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Inspired by:
 * QTObject (http://blog.deconcept.com/code/qtobject/qtobject.html)
 *
 * IMPORTANT:
 * Use JSMin to compress this plugin, NOT Packer (which
 * breaks the ActiveX/Eloas workaround because IE thinks
 * eval()'d code belongs to the document, not the external
 * javascript file).
 *
 * JSMin (http://www.crockford.com/javascript/jsmin.html)
 * Packer (http://dean.edwards.name/packer/)
 *
 * The empty statement (;) before the plugin code ensures
 * the minified version plays nice with the packed version
 * of jQuery (which doesn't end with a semicolon).
 *
 **/
;(function () {

  var $$;

  /**
   *
   * @desc Replace matching elements with a quicktime movie.
   * @author Luke Lutman
   *
   * @name quicktime
   * @param Hash htmlOptions Options for the embed/object tag.
   * @param Hash pluginOptions Options for detecting/updating the Quicktime
   *     plugin (optional).
   * @param Function replace Custom block called for each matched element if
   *     Quicktime is installed (optional).
   * @param Function update Custom block called for each matched if Quicktime
   *     isn't installed (optional).
   * @type jQuery
   *
   * @cat plugins/quicktime
   *
   * @example $('#hello').quicktime({ src: 'hello.mov' });
   * @desc Embed a Quicktime movie.
   *
   * @example $('#hello').quicktime({ src: 'hello.mov' }, { version: 7 });
   * @desc Embed a Quicktime 7 movie.
   *
   * @example $('#hello').quicktime({ src: 'hello.mov' }, { update: false });
   * @desc Embed a Quicktime movie, don't show an update message if Quicktime
   *     isn't installed.
   *
   **/
  $$ = jQuery.fn.quicktime =
      function (htmlOptions, pluginOptions, replace, update) {

        // Set the default block.
        var block = replace || $$.replace;

        // Merge the default and passed plugin options.
        pluginOptions = $$.copy($$.pluginOptions, pluginOptions);

        // Detect Quicktime.
        if (!$$.hasQuicktime(pluginOptions.version)) {
          // Ask the user to update (if specified)
          if (pluginOptions.update) {
            // Change the block to insert the update message instead of the
            // quicktime movie.
            block = update || $$.update;
            // Fail
          } else {
            // The required version of Quicktime isn't installed.
            // Update is turned off.
            // Return without doing anything.
            return this;
          }
        }

        // Merge the default, express install and passed html options.
        htmlOptions = $$.copy($$.htmlOptions, htmlOptions);

        // Invoke $block (with a copy of the merged html options) for each
        // element.
        return this.each(function () {
          block.call(this, $$.copy(htmlOptions));
        });

      };
  /**
   *
   * @name quicktime.copy
   * @desc Copy an arbitrary number of objects into a new object.
   * @type Object
   *
   * @example $$.copy({ foo: 1 }, { bar: 2 });
   * @result { foo: 1, bar: 2 };
   *
   **/
  $$.copy = function () {
    var o = new Object();
    for (var i = 0; i < arguments.length; i++) {
      jQuery.extend(o, arguments[i]);
    }
    return o;
  };
  /*
   * @name quicktime.hasQuicktime
   * @desc Check if a specific version of the Quicktime plugin is installed
   * @type Boolean
   *
   **/
  $$.hasQuicktime = function () {
    // look for a flag in the query string to bypass quicktime detection
    if (/hasQuicktime\=true/.test(location)) return true;
    if (/hasQuicktime\=false/.test(location)) return false;
    var pv = $$.hasQuicktime.playerVersion().match(/\d+/g);
    var rv = String([arguments[0], arguments[1], arguments[2]]).match(/\d+/g) ||
        String($$.pluginOptions.version).match(/\d+/g);
    for (var i = 0; i < 3; i++) {
      pv[i] = parseInt(pv[i] || 0);
      rv[i] = parseInt(rv[i] || 0);
      // player is less than required
      if (pv[i] < rv[i]) return false;
      // player is greater than required
      if (pv[i] > rv[i]) return true;
    }
    // major version, minor version and revision match exactly
    return true;
  };
  /**
   *
   * @name quicktime.hasQuicktime.playerVersion
   * @desc Get the version of the installed Quicktime plugin.
   * @type String
   *
   **/
  $$.hasQuicktime.playerVersion = function () {
    try {
      // ie -- basic version checking only
      var pv = new ActiveXObject('QuickTimeCheckObject.QuickTimeCheck.1');
      if (pv.IsQuickTimeAvailable(0)) {
        return Math.floor(pv.QuickTimeVersion.toString(16) / 1000000) + ',0,0';
      }
      // QuickTimeVersion is number, so there are no delimiters between
      // major-minor-revision numbers. The math above will most likely fail
      // when a version number flips from 9 (single digit) to 10 (double
      // digits) if the decimal point ends up in the wrong place
    } catch (e) {
      // everything else -- major, minor and revision version checking
      try {
        for (var i = 0; i < navigator.plugins.length; i++) {
          var name = navigator.plugins[i].name;
          if (/QuickTime Plug-in [\d\.]+/i.test(name)) {
            return name.replace(/[\D.]*/, '').replace(/\./g, ',');
          }
        }
      } catch (e) {
      }
    }
    return '0,0,0';
  };
  /**
   *
   * @name quicktime.htmlOptions
   * @desc The default set of options for the object or embed tag.
   *
   **/
  $$.htmlOptions = {
    height: 240,
    pluginspage: 'http://www.apple.com/quicktime/download/',
    scale: 'tofit',
    src: '#',
    type: 'video/quicktime',
    width: 320
  };
  /**
   *
   * @name quicktime.pluginOptions
   * @desc The default set of options for checking/updating the Quicktime
   *     Plugin.
   *
   **/
  $$.pluginOptions = {
    version: '7,0,0',
    update: true
  };
  /**
   *
   * @name quicktime.replace
   * @desc The default method for replacing an element with a Quicktime movie.
   *
   **/
  $$.replace = function (htmlOptions) {
    this.innerHTML = '<div class="alt">' + this.innerHTML + '</div>';
    jQuery(this).addClass('quicktime-replaced').
        prepend($$.transform(htmlOptions));
  };
  /**
   *
   * @name quicktime.update
   * @desc The default method for replacing an element with an update message.
   *
   **/
  $$.update = function (htmlOptions) {
    var url = String(location).split('?');
    url.splice(1, 0, '?hasQuicktime=true&');
    url = url.join('');
    var msg = '<p>This content requires the QuickTime Plugin. <a href="http://www.apple.com/quicktime/download/">Download QuickTime Player</a>.</p><p>Already have QuickTime Player? <a href="' +
        url + '">Click here.</a></p>';
    this.innerHTML = '<div class="alt">' + this.innerHTML + '</div>';
    $(this).addClass('quicktime-upgdate').prepend(msg);
  };
  /**
   *
   * @desc Convert a hash of html options to a string of attributes, using
   *     Function.apply().
   * @example toAttributeString.apply(htmlOptions)
   * @result foo="bar" foo="bar"
   *
   **/
  function toAttributeString() {
    var s = '';
    for (var key in this) {
      if (typeof this[key] != 'function') {
        s += key + '="' + this[key] + '" ';
      }
    }
    return s;
  };
  /**
   *
   * @name quicktime.transform
   * @desc Transform a set of html options into an embed tag.
   * @type String
   *
   * @example $$.transform(htmlOptions)
   * @result <embed src="foo.mov" ... />
   *
   * Note: The embed tag is NOT standards-compliant, but it
   * works in all current browsers. quicktime.transform can be
   * overwritten with a custom function to generate more
   * standards-compliant markup.
   *
   **/
  $$.transform = function (htmlOptions) {
    return '<embed ' + toAttributeString.apply(htmlOptions) + ' />';
  };

})();