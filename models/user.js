const path = require('path');

const Item = require('./item');

module.exports = class User extends Item {
    static databasePath = path.join(Item.databasePath, 'users.json');

    /**
     * Get all users
     * @return {User[]}
     * @static
     */

    static getAll () {
        return super.getAll(User.databasePath)
            .map(record => new User(record.name, record.pass_word, record.id));
    }

    /**
     * Get one user
     * @param {string} like "4fef-c74e-9ed1-58f0-9f66"
     * @return {User}
     * @static
     */

    static get (id) {
        return User.getAll().find(user => user.id === id);
    }

    /**
     * Get one user
     * @param {string} name
     * @param {string} pass_word
     * @param {string} id
     */

    constructor (name, pass_word, id) {
        if (id === undefined) {
            id = User.genId();
        }

        super(id);

        this.name = name;
        this.pass_word = pass_word;
    }

    add () {
        let database = User.getAll();
        database.push(this)
        this.save(database)
    }

    /**
     * Save all users into JSON database file
     * @param {User[]} database
     */

    save (database) {
        super.save(User.databasePath, database);
    }
}