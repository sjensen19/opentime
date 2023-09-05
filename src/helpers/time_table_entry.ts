import Database from "../database/database";
import { ITimeTableEntry } from "../interfaces/time_table_entry";

/**
 * Class that represents an entry inside of a timetable
 */
export class TimeTableEntry {
    /**
     * Gets an entry from the database by its id
     * @param id id of the entry
     * @returns the entry, or null if it doesn't exist
     */
    public static async fromId(id: number): Promise<ITimeTableEntry | null> {
        let query = "SELECT * FROM timetable WHERE id = ?";
        
        let entries = await Database.getInstance().sendQuery(query, [id]);

        if(entries.length == 0) return null;
        return entries[0] as ITimeTableEntry;
    }

    /**
     * Gets all entries from the database sorted by date
     * @returns all entries
     */
    public static async getAll(): Promise<ITimeTableEntry[]> {
        let query = "SELECT * FROM timetable ORDER BY date ASC";
        
        let entries = await Database.getInstance().sendQuery(query);
        return entries as ITimeTableEntry[];
    }

    /**
     * Gets all entries from the database sorted by date
     * @param group group to get entries from
     * @returns all entries
     */
    public static async getEntriesByGroup(group: string): Promise<ITimeTableEntry[]> {
        let query = "SELECT * FROM timetable WHERE edu_group = ? ORDER BY date ASC";
        
        let entries = await Database.getInstance().sendQuery(query, [group]);
        return entries as ITimeTableEntry[];
    }

    /**
     * Gets all entries by teacher from the database sorted by date
     * @param teacherId id of the teacher to get entries from
     */
    public static async getEntriesByTeacher(teacherId: number): Promise<ITimeTableEntry[]> {
        let query = "SELECT * FROM timetable WHERE teacher_id = ? ORDER BY date ASC";
        
        let entries = await Database.getInstance().sendQuery(query, [teacherId]);
        return entries as ITimeTableEntry[];
    }

    /**
     * Gets all entries for a specific week from the database sorted by date
     * @param week week to get entries from
     * @returns all entries
     */
    public static async getEntriesPerWeek(group: string, week: number): Promise<ITimeTableEntry[]> {
        let query = "SELECT * FROM timetable WHERE edu_group = ? AND WEEK(date) = ? ORDER BY date ASC";
        
        let entries = await Database.getInstance().sendQuery(query, [group, week]);
        return entries as ITimeTableEntry[];
    }

}