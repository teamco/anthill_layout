/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 11/17/12
 * Time: 4:10 PM
 * To change this template use File | Settings | File Templates.
 */

define([
  'modules/Permission'
], function defineSpeakerDeckPermission(BasePermission) {

  /**
   * Define Permissions
   * @class SpeakerDeckPermission
   * @constructor
   * @extends BasePermission
   */
  var SpeakerDeckPermission = function SpeakerDeckPermission() {
  };

  return SpeakerDeckPermission.extend(
      'SpeakerDeckPermission', {},
      BasePermission.prototype
  );
});
