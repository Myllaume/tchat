const path = require('path')
    , fs = require('fs');

const Prompt = require('./prompt')

module.exports = class Item extends Prompt {
    /**
     * Path to databse JSON file
     * @type string
     * @static
     */

    static databasePath = path.join(__dirname, '../database/');

    /**
     * Generate a unique identifier of 5 strings (seperated by dash) of 4 characters
     * From https://stackoverflow.com/a/2117523/13491646
     * @return {string} Identifier like "4fef-c74e-9ed1-58f0-9f66"
     * @static
     */

    static genId () {
        return 'xxxx-xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Get a valid id from the submited string
     * or return false if the string doesn't contain a valid id
     * @param {string} id - Identifier or a dubious string
     * @return {string|boolean} - The valid identifier or false
     * @static
     */

    static getValidId (id) {
        if (typeof id !== 'string') {
            return false;
        }

        const regex = new RegExp('[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}')
            , match = id.match(regex);
        
        if (match === null) {
            return false;
        }

        return match[0];
    }

    /**
     * Get all items from JSON database file
     * @param {string} path
     * @return {array}
     * @static
     */

    static getAll (path) {
        try {
            const databaseContent = fs.readFileSync(path);
            const database = JSON.parse(databaseContent);
            return database;
        } catch (error) {
            return [];
        }
    }

    constructor (id) {
        super();

        /**
         * Unique identifier of the item
         * @type string
         */

        this.id;

        const idTest = Item.getValidId(id);

        if (idTest === false) {
            this.errors.push('Invalid unique identifier');
            return;
        }

        this.id = idTest;
    }

    /**
     * Save all items into JSON database file
     * @param {string} path
     * @param {array} database
     */

    save (path, database) {
        if (this.isValid() === false) {
            return;
        }

        try {
            database = JSON.stringify(database);
            fs.writeFileSync(path, database);
        } catch (error) {
            console.log(error);
            this.errors.push('Can not save database');
        }
    }
}