import Database from "../database/database";
import { IStudent } from "../interfaces/student";

/**
 * Class that represents a student in the database
 */
export class Student {
    /**
     * Creates a student if it doesn't exist
     * @param entreeUid entree uid of the student
     * @param eduGroup edu group of the student
     * @returns the student
     */
    public static async createIfNotExists(entreeUid: string, eduGroup: string): Promise<IStudent | null> {
        let student = await Student.byEntreeUid(entreeUid);
        if(student) return student;

        let query = "INSERT INTO students (entree_uid, edu_group) VALUES (?, ?)";
        let result = await Database.getInstance().sendQuery(query, [entreeUid, eduGroup]);
        return await Student.fromId(result.insertId);
    }

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