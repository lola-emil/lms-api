import CrudRepo from "../../../utils/crudrepo";


export type UserProfile = {
    id: number,
    user_id: number,

    fname: string,
    mname?: string,
    lname: string,

    home_address: string,


}

export default new CrudRepo<UserProfile>("user_profiles");