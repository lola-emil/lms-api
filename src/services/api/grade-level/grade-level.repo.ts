import CrudRepo from "../../../utils/crudrepo";

export type GradeLevel = {
    id: number,
    level: number,
};


export default new CrudRepo<GradeLevel>("class_levels");