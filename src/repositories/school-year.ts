import CrudRepo from "../utils/crudrepo";


export type SchoolYear = {
    id: number,
    year_from: number,
    year_to: number,

    is_current: boolean,

    created_at: string,
    updated_at: string;
};


export default new CrudRepo<SchoolYear>("school_years");