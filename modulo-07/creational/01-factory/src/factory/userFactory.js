const UserRepository = require("../repository/userRepository");
const UserService = require("../service/userService");
const Database = require("../utils/database");

class UserFactory {
    static async createInstance() {
        const db = new Database({ connectionString: 'mongodv://localhost' });
        const dbConnection = await db.connect();
        
        const userRepository = new UserRepository({ dbConnection });
        const userService = new UserService({ userRepository });

        return userService;
    }
}

module.exports = UserFactory;