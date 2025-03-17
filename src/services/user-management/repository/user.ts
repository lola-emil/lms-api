import CrudRepo from "../../../shared/utils/crudrepo";



const TBL_NAME = "users";

export type User = {
    id: number;
    id_number?: string;
    
    fname: string;
    mname?: string;
    lname: string;
    picture?: string;
    
    address?: string;
    city?: string;
    
    email: string;
    password: string;
    
    last_login?: Date;
    
    suspended: boolean;
    deleted: boolean;
    
    created_at: Date;
    updated_at: Date;
};

export default new CrudRepo<User>(TBL_NAME);