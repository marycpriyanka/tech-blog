const {User} = require("../models");

const userData = [
    {
        name: "Jane",
        email: "jane@email.com",
        password: "qwertyui"
    },
    {
        name: "Tom",
        email: "tom@email.com",
        password: "12345678"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;