import CrudRepo from "../../../utils/crudrepo";


export type Users = {
    id: number,

    email: string;
    password: string;

    role_id: number;

    created_at: string;
    updated_at: string;
};

export default new CrudRepo<Users>("users");