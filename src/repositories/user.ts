import CrudRepo from "../utils/crudrepo";



export type User = {
  id: number,

  address?: string,
  city?: string,

  email: string,
  password: string,

  last_login: string, // date ni siya

  role_id: number,

  suspended: boolean,
  deleted: boolean,

  created_at: string, // date
  updated_at: string
};

export default new CrudRepo<User>("users");