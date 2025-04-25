import CrudRepo from "../../../utils/crudrepo";

interface Subject {
    id: number; // Primary key, Auto Increment
    subject_name: string; // Name of the subject
    class_level_id: number; // Foreign key to the class_levels table
    created_by: number; // Foreign key to the users (creator) table
    updated_by: number; // Foreign key to the users (last updater) table
    created_at: string; // ISO string format for the creation date and time
    updated_at: string; // ISO string format for the updated date and time
  }
  

  export default new CrudRepo<Subject>("subjects")