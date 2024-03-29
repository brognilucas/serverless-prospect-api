import { ProspectCombineDocument } from "app/model";
import { Model } from "mongoose";
import { Combine } from "../model/dto/CombineDTO";

export class ProspectCombineService {
    private combineProspectModel: Model<ProspectCombineDocument>;
    constructor(combineProspectModel: Model<ProspectCombineDocument>) {
        this.combineProspectModel = combineProspectModel;
    }

    protected async create(combine: Combine): Promise<Combine> {
        return this.combineProspectModel.create(combine);
    }

    protected async find(query: unknown): Promise<Combine[]> {
        return this.combineProspectModel.find(query);
    }

    protected async findByProspect(prospect: string): Promise<Combine> {
        return this.combineProspectModel.findOne({ prospect }).lean();
    }

    protected async update(prospectId: string, combineData: Combine): Promise<Combine> {
        return this.combineProspectModel.findOneAndUpdate({ prospect: prospectId }, { $set: combineData }).lean();
    }

    protected async delete(prospect: string): Promise<unknown> {
        return this.combineProspectModel.deleteOne({ prospect }).lean()
    }
}
