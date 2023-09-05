import Database from "../database/database";
import { IStudent } from "../interfaces/student";

/**
 * Class that represents a student in the database
 */
export class Student {
    /**
     * Gets a student from the database by its id
     * @param id id of the student
     * @returns the student, or null if it doesn't exist
     */
    public static async fromId(id: number): Promise<IStudent | null> {
        let query = "SELECT * FROM students WHERE id = ?";
        
        let students = await Database.getInstance().sendQuery(query, [id]);

        if(students.length == 0) return null;
        return students[0] as IStudent;
    }

    /**
     * Gets all students from the database by their edu group
     * @returns all students
     */
    public static async byEducationalGroup(group: string): Promise<IStudent[]> {
        let query = "SELECT * FROM students WHERE edu_group = ?";
        
        let students = await Database.getInstance().sendQuery(query, [group]);
        return students as IStudent[];
    }

    /**
     * Gets a student from the database by its entree uid
     * @param entreeUid entree uid of the student
     * @returns the student, or null if it doesn't exist
     */
    public static async byEntreeUid(entreeUid: string): Promise<IStudent | null> {
        let query = "SELECT * FROM students WHERE entree_uid = ?";
        
        let students = await Database.getInstance().sendQuery(query, [entreeUid]);

        if(students.length == 0) return null;
        return students[0] as IStudent;
    }
}