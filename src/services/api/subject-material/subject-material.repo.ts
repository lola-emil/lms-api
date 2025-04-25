import CrudRepo from "../../../utils/crudrepo";

interface SubjectMaterial {
    id: number; // Primary key, Auto Increment
    title: string; // Title of the material
    type: 'document' | 'quiz' | 'video'; // Enum representing the type of material
    file_url?: string; // Optional URL to the material (could be null or empty)
    created_by: number; // ID of the user who created the material
    updated_by: number; // ID of the user who last updated the material
    created_at: string; // ISO string for the creation timestamp
    updated_at: string; // ISO string for the update timestamp
}


export default new CrudRepo<SubjectMaterial>("subject_materials");