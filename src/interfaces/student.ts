/**
 * Interface for Student. Represents a student in the database.
 */
export interface IStudent {
    /**
     * Id of the student
     */
    id: number;

    /**
     * Entree uid of the student
     */
    entree_uid: string;

    /**
     * Edu group of the student
     */
    edu_group: string;
}