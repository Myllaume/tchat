const User = require('../models/user');
const Message = require('../models/message');

const { faker } = require('@faker-js/faker');

for (let i = 0; i < 5; i++) {
    const user = new User(`${faker.name.firstName()} ${faker.name.lastName()}`, 'azerty')
    user.add();

    for (let i = 0; i < 10; i++) {
        const msg = new Message(faker.lorem.lines(2), user.id)
        msg.add();
    }
}