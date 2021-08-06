import { Criteria } from "app/model/dto/CriteriaDTO";
import { Model } from "mongoose";
import { UserCriteriaDocument } from "../model";

export class UserCriteriaService {
  private userCriteria: Model<UserCriteriaDocument>;

  constructor(model: Model<UserCriteriaDocument>) {
    this.userCriteria = model;
  }

  async createUserCriteria(criteria: Criteria): Promise<UserCriteriaDocument> {
    return this.userCriteria.create(criteria)
  }

  async findByUserAndPosition(criteria: Criteria): Promise<UserCriteriaDocument> {
    return this.userCriteria.findOne({ position: criteria.position, _id: criteria._id })
  }
}
