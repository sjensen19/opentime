import * as mysql from 'mysql2/promise';

/**
 * Singleton class for database connection
 */
class Database {
    /**
     * Singleton database instance
     */
    private static instance: Database;

    /**
     * Constructor to prevent multiple instances
     * @returns Database instance
     */
    public static getInstance(): Database {
        if(!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
     * Connection to the database
     */
    private connection?: mysql.Connection;

    /**
     * Private constructor to create the database connection
     */
    private async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: "",
            database: process.env.DB_NAME
        });
    }

    /**
     * Send a query to the database.
     * @param sql The query to send
     * @param args The parameters to use in the query
     * @returns the rows returned by the query
     * @example
     * let result = sendQuery("SELECT * FROM users WHERE id = ?", ["1"]);
     * console.log(result);
     * // [ { id: 1, username: 'admin', password: 'admin', email: 'admin@admin', admin: 1 } ]
     */
    public async sendQuery(sql: string, args?: any) {
        if(!this.connection) {
            await this.connect();
        }
        let [rows, _] = await this.connection!.execute(sql, args);
        return JSON.parse(JSON.stringify(rows));
    }
}

export default Database;