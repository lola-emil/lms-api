import CrudRepo from "../../../utils/crudrepo";


export type SchoolYear = {
    id: number;
    start_year: number;
    end_year: number;

    created_at: string;
    updated_at: string;
};


export default new CrudRepo<SchoolYear>("school_years");