import CrudRepo from "../../../utils/crudrepo";

export interface ClassworkAttachment {
    id: number;
    classwork_submission_id: number;
    file_url: string;
}

export default new CrudRepo<ClassworkAttachment>("classwork_attachments");