import { db } from "../config/db";
import CrudRepo from "../utils/crudrepo";

const TBL_NAME = "activity_types";
export type ActivityType = {
    id: number,
    name: string,

    created_at: Date,
    updated_at: Date,
}


export default new CrudRepo<ActivityType>(TBL_NAME);