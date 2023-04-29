import { Model, Document, Types } from 'mongoose';

export const createData = async<T extends Document>(modalName: Model<T>, data: any): Promise<T> => {
    const result = modalName.create(data)
    return result;
}

export const findData = async<T extends Document>(modalName: Model<T>, query: any): Promise<T[]> => {
    const result = await modalName.find(query);
    return result;
}

export const findById = async<T extends Document>(model: Model<T>, id: any): Promise<T | null> => {
    const document = await model.findById(id);
    return document;
}

export const findOneData = async<T extends Document>(model: Model<T>, query: any): Promise<T | null> => {
    const document = await model.findOne(query);
    return document;
}

export const updateOneData = async<T extends Document>(model: Model<T>, query: any, data: any): Promise<T | null> => {
    const updatedDocument = await model.updateOne(query, data);
    if (updatedDocument.modifiedCount === 0) {
        return null;
    }
    const document = await model.findOne(query);
    return document;
}