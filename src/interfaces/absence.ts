import { AbsenceStatus } from "../enums/absence_status";

/**
 * Represents an absence entry in the database
 */
export interface IAbsence {
    /**
     * Id of the absence
     */
    id: number;

    /**
     * Student associated with the absence
     */
    student_id: number;

    /**
     * Timetable entry associated with the absence
     */
    timetable_id: number;
    
    /**
     * Reason of the absence
     */
    reason: string;

    /**
     * Status of the absence
     * 
     * @see AbsenceStatus
     */
    status: AbsenceStatus;

    /**
     * Person who has reported the absence.
     * Can be the student itself, the teacher or a parent of the mentioned student.
     */
    reporter: string;
}