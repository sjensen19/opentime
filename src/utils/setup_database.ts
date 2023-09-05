import Database from "../database/database";

import * as dotenv from 'dotenv';
dotenv.config();

// Queries to create the database tables and set them up
const queries = [
    `CREATE TABLE \`opentime\`.\`timetable\`
    (
       \`id\`          INT NOT NULL auto_increment,
       \`edu_group\`   VARCHAR(200) NOT NULL,
       \`time_start\`  TIME NOT NULL,
       \`time_end\`    TIME NOT NULL,
       \`date\`        DATE NOT NULL,
       \`teacher_id\`  INT NOT NULL,
       \`location\`    VARCHAR(20) NOT NULL,
       \`description\` VARCHAR(100) NOT NULL,
       PRIMARY KEY (\`id\`)
    );`,
    `CREATE TABLE \`opentime\`.\`students\`
    (
       \`id\`         INT NOT NULL auto_increment,
       \`entree_uid\` VARCHAR(200) NOT NULL,
       \`edu_group\`  VARCHAR(100) NOT NULL,
       PRIMARY KEY (\`id\`)
    );`
];

/**
 * Setup the database
 * 
 * Note that a database called \`opentime\` must exist before calling this utility function
 */
export function setupDatabase() {
    for(let query of queries) {
        try {
            Database.getInstance().sendQuery(query);
        } catch(e) {
            console.error(e);
        }
    }
}

setupDatabase();