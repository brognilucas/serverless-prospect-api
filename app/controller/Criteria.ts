
import { UserCriteriaService } from '../service/UserCriteria';
import { Model } from 'mongoose';
import { UserCriteriaDocument } from '../model/'
import { MessageUtil } from '../utils/message';
import { Criteria } from '../model/dto/CriteriaDTO';
import { IEvent } from '../model/dto/IEvent';
import { ResponseVO } from 'app/utils/model/vo/responseVo';

export class UserCriteriaController extends UserCriteriaService {
  constructor(criteria: Model<UserCriteriaDocument>) {
    super(criteria);
  }

  async create(event: IEvent): Promise<ResponseVO> {
    const { principalId: userId } = event.requestContext.authorizer;
    const userCriteria: Criteria = JSON.parse(event.body);

    const criteriaPercentage = userCriteria.criteria.reduce((prev, next) => prev + next.percentage, 0);

    if (!userCriteria.position) {
      return MessageUtil.error(400, 'Must inform which position the criteria refers to')
    }

    if (criteriaPercentage !== 100) {
      return MessageUtil.error(400, 'Percentage should be equal to 100')
    }

    Object.assign(userCriteria, { _id: userId });

    const userCriteriaDB = await this.findByUserAndPosition(userCriteria);

    if (userCriteriaDB) {
      return MessageUtil.error(400, `User already have created a criteria for ${userCriteria.position}`)
    }

    await this.createUserCriteria(userCriteria)

    return MessageUtil.successNoContent()
  }
}