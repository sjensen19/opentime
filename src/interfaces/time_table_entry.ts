/**
 * Interface that represents an entry inside of a timetable
 */
export interface ITimeTableEntry {
    /**
     * id of the TimeTableEntry
     */
    id: number;
    
    /**
     * Group the entry belongs to
     */
    edu_group: string;

    /**
     * Time the entry starts at
     */
    time_start: Date;

    /**
     * Time the entry finishes
     */
    time_end: Date;

    /**
     * Date of the entry
     */
    date: Date;

    /**
     * The teacher associated with the entry
     */
    teacher_id: number;

    /**
     * Location of the entry
     */
    location: string;

    /**
     * Description of the entry shown in the timetable
     */
    description: string;
}