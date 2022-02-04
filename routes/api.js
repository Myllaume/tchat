module.exports = function (item, id) {
    let Class;

    switch (item) {
        case 'user':
            Class = require('../models/user')
        break;

        case 'message':
            Class = require('../models/message')
        break;

        default:
            return undefined;
    }

    if (id) {
        return Class.get(id);
    }
    return Class.getAll();
}