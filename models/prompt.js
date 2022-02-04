module.exports = class Prompt {

    /**
     * Init error panel
     * @constructor
     */

    constructor () {
        /**
         * Errors stored during the item process
         * @type array
         */

        this.errors = [];
    }

    writeErrorsReport () {
        return this.errors.join('\n');
    }

    logErrors () {
        if (this.errors.length === 0) { return; }

        console.error('\x1b[31m', 'Err.', '\x1b[0m', '\n', this.writeErrorsReport());
    }

    isValid () {
        if (this.errors.length === 0) {
            return true; }

        return false;
    }
    
}