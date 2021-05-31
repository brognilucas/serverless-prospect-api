import mongoose from 'mongoose';
import { User } from './dto/User';

export type UserDocument = mongoose.Document & User

const userSchema = new mongoose.Schema({
    username: { type: String, index: true, unique: true },
    password: {type: String},
    email:  { type: String, index: true, unique: true },
    name: {type: String},
    createdAt: { type: Date, default: Date.now },
});

userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ email: 1 , username: 1 });

export const userModel =
    mongoose.models.users ||
    mongoose.model<UserDocument>(
        'users',
        userSchema,
        process.env.USER_SCHEMA || 'users'
    );
