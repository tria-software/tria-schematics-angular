import { FilterBase } from "src/app/_models/filter-base";

export class ProfileFilterDTO extends FilterBase {
    description?: string;
    status?: boolean;
}