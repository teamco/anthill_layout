(function addStringMethods() {

    /**
     * String to CamelCase by dot separator
     * @member {Function} String
     * @returns {String}
     */
    String.prototype.toCamel = function toCamel() {
        return this.replace(/(\.[a-z])/g,function ($1) {
            return $1.toUpperCase().replace(/\./, '');
        }).replace(/(-[a-z])/g, function ($1) {
                return $1.toUpperCase().replace(/-/, '');
            });
    };

    /**
     * String from CamelCase to point separator
     * @member {Function} String
     * @returns {String}
     */
    String.prototype.toPoint = function toPoint() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "." + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to underscore separator
     * @returns {string}
     */
    String.prototype.toUnderscore = function toUnderscore() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "_" + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to dash separator
     * @returns {string}
     */
    String.prototype.toDash = function toDash() {
        return this.replace(/([A-Z])/g, function ($1) {
            return "-" + $1.toLowerCase();
        });
    };

    /**
     * String from CamelCase to dash separator
     * @returns {string}
     */
    String.prototype.toClassName = function toClassName() {
        return this.toLowerCase().replace(/ /g, '-');
    };
}());