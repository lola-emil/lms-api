import CrudRepo from "../../../shared/utils/crudrepo";


const TBL_NAME = "user_temp_credentials";
export type UserTempCredential = {
    id: number,
    temp_password: string,

    expires_at: Date,

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<UserTempCredential>(TBL_NAME);