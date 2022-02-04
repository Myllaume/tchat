const path = require('path');

const Item = require('./item')
    , User = require('./user');

module.exports = class Message extends Item {
    static databasePath = path.join(Item.databasePath, 'messages.json');

    /**
     * Get all messages
     * @return {Message[]}
     * @static
     */

    static getAll () {
        return super.getAll(Message.databasePath)
            .map(record => new Message(record.content, record.user_id, record.id));
    }

    /**
     * Get one user
     * @param {string} like "4fef-c74e-9ed1-58f0-9f66"
     * @return {User}
     * @static
     */

    static get (id) {
        return Message.getAll().find(message => message.id === id);
    }

    /**
     * Get one user
     * @param {string} name
     * @param {string} pass_word
     * @param {string} id
     */

    constructor (content, user_id, id) {
        if (id === undefined) {
            id = Message.genId();
        }

        super(id);

        this.content = content;
        if (User.get(user_id) === undefined) {
            this.errors.push('User id unknown')
        }
        this.user_id = user_id;
    }

    add () {
        let database = Message.getAll();
        database.push(this)
        this.save(database)
    }

    /**
     * Save all messages into JSON database file
     * @param {Message[]} database
     */

    save (database) {
        super.save(Message.databasePath, database);
    }
}