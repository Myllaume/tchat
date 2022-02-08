const User = require('../models/user')
    , Message = require('../models/message');

module.exports = function (item, id) {
    let elt;

    switch (item) {
        case 'user':
            if (id) {
                return User.get(id);
            }
            return User.getAll();

        case 'message':
            if (id) {
                return Message.get(id);
            }
            return Message.getAll();

        default:
            return undefined;
    }
}