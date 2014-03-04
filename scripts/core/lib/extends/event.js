/**
 * Created with RubyMine.
 * User: i061485
 * Date: 1/19/14
 * Time: 11:11 AM
 * https://github.com/porada/resizeend
 */

(function addEventShims(window) {

    var currentOrientation,
        debounce,
        dispatchResizeEndEvent,
        document,
        events,
        getCurrentOrientation,
        initialOrientation,
        resizeDebounceTimeout;

    document = window.document;

    if (!(window.addEventListener && document.createEvent)) {
        return;
    }

    /**
     * Define events
     * @type {Array}
     */
    events = ['resize:end', 'resizeend'].map(

        /**
         * Init event
         * @param name
         * @returns {*|Event}
         * @private
         */
        function _initEvent(name) {
            var event;
            event = document.createEvent('Event');
            event.initEvent(name, false, false);
            return event;
        }
    );

    /**
     * Dispatch resize end event
     */
    dispatchResizeEndEvent = function dispatchResizeEndEvent() {
        return events.forEach(
            window.dispatchEvent.bind(window)
        );
    };

    /**
     * Mobile resize solution
     * @returns {number}
     */
    getCurrentOrientation = function getCurrentOrientation() {
        return Math.abs(+window.orientation || 0) % 180;
    };

    initialOrientation = getCurrentOrientation();
    currentOrientation = null;
    resizeDebounceTimeout = null;

    /**
     * Debounce event
     * @returns {*}
     */
    debounce = function debounce() {
        currentOrientation = getCurrentOrientation();
        if (currentOrientation !== initialOrientation) {
            dispatchResizeEndEvent();
            return initialOrientation = currentOrientation;
        } else {
            clearTimeout(resizeDebounceTimeout);
            return resizeDebounceTimeout = setTimeout(dispatchResizeEndEvent, 100);
        }
    };

    return window.addEventListener('resize', debounce, false);

})(window);