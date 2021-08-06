/* eslint-disable @typescript-eslint/ban-types */
import { Position } from "../../utils/enums/PositionsEnum";
import { UserDTO } from "./UserDTO";

export interface Criteria {
    _id: UserDTO['username'];
    position: Position;
    criteria: CriteriaItem[]
}


export interface CriteriaItem {
    label: String;
    percentage: number;
}