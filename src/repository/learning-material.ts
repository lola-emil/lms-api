import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "learning_materials";
export type LearningMaterial = {
    id: number,
    
    uri: string,

    created_by: number,
    created_at: Date,
    updated_at: Date,
};


export default new CrudRepo<LearningMaterial>(TBL_NAME);