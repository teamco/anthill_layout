/**
 * @export LibEvent
 * @class
 */
export class LibEvent {

  /**
   * @method
   * @param el
   * @param evt
   * @param sel
   * @param handler
   */
  on(el, evt, sel, handler) {
    el.addEventListener(evt, function(event) {
      let t = event.target;
      while (t && t !== this) {
        if (t.matches(sel)) {
          handler.call(t, event);
        }
        t = t.parentNode;
      }
    });
  }
}