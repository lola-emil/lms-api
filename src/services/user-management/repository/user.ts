import CrudRepo from "../../../shared/utils/crudrepo";



const TBL_NAME = "users";
export type User = {
    id: number,
    email: string,
    password: string,

    role_id: number, // katung student or teacher or admin man galing

    created_at: Date,
    updated_at: Date,
};

export default new CrudRepo<User>(TBL_NAME);