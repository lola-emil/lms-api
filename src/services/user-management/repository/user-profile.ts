import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "user_profiles";
export type UserProfile = {
    id: number,
    fname: string,
    mname: string,
    lname: string,

    id_no: string, // katung number nga naa sa ilang id

    dob: Date, // date of birth

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<UserProfile>(TBL_NAME);