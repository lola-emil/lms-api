import CrudRepo from "../../../shared/utils/crudrepo";



const TBL_NAME = "user_emails";
export type UserEmail = {
    id: number,

    email: string,
    is_verified: boolean,
    is_default: boolean,

    created_at: Date,
    updated_at: Date
}

export default new CrudRepo<UserEmail>(TBL_NAME);