import CrudRepo from "../../../utils/crudrepo";


export type UserProfile = {
    id: number;
    fname: string;
    mname?: string;
    lname: string;

    home_address?: string;
    contact_no: string;
    user_id: number
};

export default new CrudRepo<UserProfile>("user_profiles");