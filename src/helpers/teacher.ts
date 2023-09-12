import Database from "../database/database";
import { ITeacher } from "../interfaces/teacher";

/**
 * Class that represents a teacher in the database
 * @see ITeacher
 */
export class Teacher {
    /**
     * Gets a teacher from the database by its id
     * @param id id of the teacher
     * @returns the teacher, or null if it doesn't exist
     */
    public static async fromId(id: number): Promise<ITeacher | null> {
        let query = "SELECT * FROM teachers WHERE id = ?";
        
        let teachers = await Database.getInstance().sendQuery(query, [id]);

        if(teachers.length == 0) return null;
        return teachers[0] as ITeacher;
    }

    /**
     * Gets a teacher from the database by its name
     * @param name name of the teacher
     * @returns the teacher, or null if it doesn't exist
     */
    public static async byName(name: string): Promise<ITeacher | null> {
        let query = "SELECT * FROM teachers WHERE name = ?";
        
        let teachers = await Database.getInstance().sendQuery(query, [name]);

        if(teachers.length == 0) return null;
        return teachers[0] as ITeacher;
    }

    /**
     * Gets all teachers from the database
     * @returns all teachers
     */
    public static async all(): Promise<ITeacher[]> {
        let query = "SELECT * FROM teachers";
        
        let teachers = await Database.getInstance().sendQuery(query);
        return teachers as ITeacher[];
    }

    /**
     * Creates a teacher if it doesn't exist
     * @param name name of the teacher
     * @returns the teacher
     */
    public static async createIfNotExists(name: string): Promise<ITeacher | null> {
        let teacher = await Teacher.byName(name);
        if(teacher) return teacher;

        let query = "INSERT INTO teachers (name) VALUES (?)";
        let result = await Database.getInstance().sendQuery(query, [name]);
        return await Teacher.fromId(result.insertId);
    }
}