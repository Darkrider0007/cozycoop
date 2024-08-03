import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
    userAvatar?: string;
    refreshToken?: string;
    isVerified?: boolean;
    verificationCode?: string;
    verificationCodeExpires?: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required:  [true, 'Password is required'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    userAvatar: {
        type: String
    },
    refreshToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        required: [true, 'Verify Code is required'],
    },
    verificationCodeExpires:{
        type: Date,
        required: [true, 'Verify Code Expiry is required'],
    },
},
    {
        timestamps: true
    }
);

const UserModel = mongoose.models.User as mongoose.Model<User>
    || mongoose.model<User>("User", UserSchema);


export default UserModel;
