import Database from "../database/database";
import { IAbsence } from "../interfaces/absence";

/**
 * Class that represents an absence in the database
 * @see IAbsence
 */
export class Absence {
    /**
     * Gets an absence from the database by its id
     * @param id id of the absence
     * @returns the absence, or null if it doesn't exist
     * @see IAbsence
     * @see Absence
     * @see AbsenceStatus
     */
    public static async fromId(id: number): Promise<IAbsence | null> {
        let query = "SELECT * FROM absence WHERE id = ?";
        
        let absences = await Database.getInstance().sendQuery(query, [id]);

        if(absences.length == 0) return null;
        return absences[0] as IAbsence;
    }

    /**
     * Retrieves absences from the database for a single student
     * @param studentId id of the student
     * @returns absences
     */
    public static async forStudent(studentId: number): Promise<IAbsence[]> {
        let query = "SELECT * FROM absence WHERE student_id = ?";
        
        let absences = await Database.getInstance().sendQuery(query, [studentId]);
        return absences as IAbsence[];
    }

    /**
     * Retrieves absences from the database for a single timetable entry
     * @param timetableId id of the timetable entry
     * @returns absences
     */
    public static async forTimetableEntry(timetableId: number): Promise<IAbsence[]> {
        let query = "SELECT * FROM absence WHERE timetable_id = ?";
        
        let absences = await Database.getInstance().sendQuery(query, [timetableId]);
        return absences as IAbsence[];
    }

    /**
     * Creates a new absence
     * @param studentId id of the student
     * @param timetableId id of the timetable entry
     * @param reason reason of the absence
     * @param reporter person who has reported the absence
     * @returns the absence
     */
    public static async new(studentId: number, timetableId: number, reason: string, reporter: string): Promise<IAbsence> {
        let query = "INSERT INTO absence (student_id, timetable_id, reason, reporter) VALUES (?, ?, ?, ?)";
        let result = await Database.getInstance().sendQuery(query, [studentId, timetableId, reason, reporter]);
        return await Absence.fromId(result.insertId) || {} as IAbsence;
    }
}