(function addStringMethods() {

    /**
     * Duplicate string
     * @memberOf String
     * @param times
     * @returns {string}
     */
    String.prototype.repeat = function (times) {
        return (new Array(times + 1)).join(this);
    };

    /**
     * String to CamelCase by dot separator
     * @memberOf String
     * @returns {String}
     */
    String.prototype.toCamel = function toCamel() {
        return this.replace(/(\.[a-z])/g, function ($1) {
            return $1.toUpperCase().replace(/\./, '');
        }).replace(/(-[a-z])/g, function ($1) {
            return $1.toUpperCase().replace(/-/, '');
        });
    };

    /**
     * String from CamelCase to point separator
     * @memberOf String
     * @returns {String}
     */
    String.prototype.toPoint = function toPoint() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "." + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to underscore separator
     * @memberOf String
     * @returns {string}
     */
    String.prototype.toUnderscore = function toUnderscore() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "_" + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to dash separator
     * @memberOf String
     * @returns {string}
     */
    String.prototype.toDash = function toDash() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "-" + $1.toLowerCase();
        }).replace(/^-/, '');
    };

    /**
     * String from CamelCase to dash separator
     * @memberOf String
     * @returns {string}
     */
    String.prototype.toClassName = function toClassName() {
        return this.toLowerCase().
            replace(/[^\w\s]|_/g, ' ').
            replace(/ +(?= )/g, '').
            replace(/ /g, '-');
    };

    /**
     * Capitalize string
     * @memberOf String
     * @returns {string}
     */
    String.prototype.capitalize = function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    /**
     * JsCase string
     * @memberOf String
     * @returns {string}
     */
    String.prototype.jsCase = function jsCase() {
        return this.charAt(0).toLowerCase() + this.slice(1);
    };

    /**
     * String humanize
     * @memberOf String
     * @returns {string}
     */
    String.prototype.humanize = function humanize() {
        return this.toString().
            replace(/([a-z\d])([A-Z]+)/g, '$1_$2').
            replace(/[-\s]+/g, '_').toLowerCase().
            replace(/[\W_]+/g, ' ').
            capitalize();
    };

    /**
     * String utf8 to base64
     * @memberOf String
     * @returns {string}
     */
    String.prototype.utf82base64 = function utf82base64() {
        return window.btoa(encodeURIComponent(encodeURI(this)));
    };

    /**
     * String base64 to utf8
     * @memberOf String
     * @returns {string}
     */
    String.prototype.base642utf8 = function base642utf8() {
        return decodeURI(decodeURIComponent(window.atob(this)));
    };

    /**
     * String to DOM element
     * @memberOf String
     * @returns {*}
     */
    String.prototype.toHtml = function toHtml() {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = this;
        return tempDiv.firstChild;
    };

}());