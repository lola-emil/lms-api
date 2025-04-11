import CrudRepo from "../../../utils/crudrepo";


export type User = {
    id: number;
    email: string;
    password: string;
    user_role_id: number;
    created_at: string;
    updated_at: string;
};

export default new CrudRepo<User>("users");